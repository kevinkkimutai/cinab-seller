<?php

namespace App\Traits;

use App\{
    Models\Setting,
    Models\PromoCode,
    Models\TrackOrder,
    Helpers\EmailHelper,
    Helpers\PriceHelper,
    Models\Notification,
    Models\PaymentSetting,
};
use App\Helpers\SmsHelper;
use App\Models\Item as ModelsItem;
use App\Models\Order;
use App\Models\ShippingService;
use App\Models\State;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Omnipay\Omnipay;


trait PaypalCheckout
{

    private $_api_context;

    public function __construct()
    {
        $data = PaymentSetting::whereUniqueKeyword('paypal')->first();
        $paydata = $data->convertJsonData();
        // $paypal_conf = Config::get('paypal');
        // $paypal_conf['client_id'] = $paydata['client_id'];
        // $paypal_conf['secret'] = $paydata['client_secret'];
        // $paypal_conf['settings']['mode'] = $paydata['check_sandbox'] == 1 ? 'sandbox' : 'live';
        // $this->_api_context = new ApiContext(new OAuthTokenCredential(
        //     $paypal_conf['client_id'],
        //     $paypal_conf['secret'])
        // );
        // $this->_api_context->setConfig($paypal_conf['settings']);

        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId($paydata['client_id']);
        $this->gateway->setSecret($paydata['client_secret']);
        $this->gateway->setTestMode(true);
    }

    public function paypalSubmit($data)
    {

        $user = Auth::user();
        $setting = Setting::first();
        $cart = Session::get('cart');

        $total_tax = 0;
        $cart_total = 0;
        $total = 0;
        $option_price = 0;
        foreach ($cart as $key => $item) {

            $total += $item['main_price'] * $item['qty'];
            $option_price += $item['attribute_price'];
            $cart_total = $total + $option_price;
            $item = ModelsItem::findOrFail($key);
            if ($item->tax) {
                $total_tax += $item::taxCalculate($item);
            }
        }
        $shipping = [];
        if (ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->exists()) {
            $shipping = ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->first();
            if ($cart_total >= $shipping->minimum_price) {
                $shipping = $shipping;
            } else {
                $shipping = [];
            }
        }

        if (!$shipping) {
            $shipping = ShippingService::whereStatus(1)->where('id', '!=', 1)->first();
        }

        if (!PriceHelper::Digital()) {
            $shipping = null;
        }

        $discount = [];
        if (Session::has('coupon')) {
            $discount = Session::get('coupon');
        }
        $orderData['state'] =  $data['state_id'] ? json_encode(State::findOrFail($data['state_id']), true) : null;
        $grand_total = ($cart_total + ($shipping ? $shipping->price : 0)) + $total_tax;
        $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
        $grand_total += PriceHelper::StatePrce($data['state_id'], $cart_total);
        $total_amount = PriceHelper::setConvertPrice($grand_total);
        $orderData['cart'] = json_encode($cart, true);
        $orderData['discount'] = json_encode($discount, true);
        $orderData['shipping'] = json_encode($shipping, true);
        $orderData['tax'] = $total_tax;
        $orderData['state_price'] = PriceHelper::StatePrce($data['state_id'], $cart_total);
        $orderData['shipping_info'] = json_encode(Session::get('shipping_address'), true);
        $orderData['billing_info'] = json_encode(Session::get('billing_address'), true);
        $orderData['payment_method'] = 'Paypal';
        $orderData['user_id'] = isset($user) ? $user->id : 0;

        $paypal_item_name = 'Payment via paypal from' . ' ' . $setting->title;
        $paypal_item_amount =  $total_amount;

        $payment_cancel_url = route('front.checkout.cancle');
        $payment_notify_url = route('front.checkout.redirect');

        try {

            $response = $this->gateway->purchase(array(
                'amount' => $paypal_item_amount,
                'currency' => PriceHelper::setCurrencyName(),
                'returnUrl' => $payment_notify_url,
                'cancelUrl' => $payment_cancel_url
            ))->send();

            if ($response->isRedirect()) {

                Session::put('order_data', $orderData);
                Session::put('order_payment_id', $response->getTransactionReference());
                if ($response->redirect()) {
                    /** redirect to paypal **/

                    return [
                        'status' => true,
                        'link' => $response->redirect()
                    ];
                }
            } else {
                dd($response->getMessage());
                return $response->getMessage();
            }
        } catch (\Throwable $th) {

            return [
                'status' => false,
                'message' => $th->getMessage()
            ];
        }
    }

    public function paypalNotify($responseData)
    {
        //dd($responseData);
        $orderData = Session::get('order_data');
        /** Get the payment ID before session clear **/
        $payment_id = Session::get('order_payment_id');

        /** clear the session payment ID **/
        if (empty($responseData['PayerID']) || empty($responseData['token'])) {
            return [
                'status' => false,
                'message' => __('Unknown error occurred')
            ];
        }
        $transaction = $this->gateway->completePurchase(array(
            'payer_id' => $responseData['PayerID'],
            'transactionReference' => $responseData['paymentId'],
        ));


        $response = $transaction->send();
        if ($response->isSuccessful()) {
           
            $cart = Session::get('cart');
            $user = Auth::user();
            $total_tax = 0;
            $cart_total = 0;
            $total = 0;
            $option_price = 0;
            foreach ($cart as $key => $item) {

                $total += $item['main_price'] * $item['qty'];
                $option_price += $item['attribute_price'];
                $cart_total = $total + $option_price;
                $item = ModelsItem::findOrFail($key);
                if ($item->tax) {
                    $total_tax += $item->tax->value;
                }
            }
            $shipping = [];
            if (ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->exists()) {
                $shipping = ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->first();
                if ($cart_total >= $shipping->minimum_price) {
                    $shipping = $shipping;
                } else {
                    $shipping = [];
                }
            }

            if (!$shipping) {
                $shipping = ShippingService::whereStatus(1)->where('id', '!=', 1)->first();
            }
            $discount = [];
            if (Session::has('coupon')) {
                $discount = Session::get('coupon');
            }

            $grand_total = ($cart_total + ($shipping ? $shipping->price : 0)) + $total_tax;
            $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
            $total_amount = PriceHelper::setConvertPrice($grand_total);
            $orderData['cart'] = json_encode($cart, true);
            $orderData['discount'] = json_encode($discount, true);
            $orderData['shipping'] = json_encode($shipping, true);
            $orderData['tax'] = $total_tax;
            $orderData['shipping_info'] = json_encode(Session::get('shipping_address'), true);
            $orderData['billing_info'] = json_encode(Session::get('billing_address'), true);
            $orderData['payment_method'] = 'Paypal';
            $orderData['user_id'] = isset($user) ? $user->id : 0;
      
            $orderData['txnid'] = $response->getData()['transactions'][0]['related_resources'][0]['sale']['id'];
            $orderData['payment_status'] = 'Paid';
            $orderData['transaction_number'] = Str::random(10);
            $orderData['currency_sign'] = PriceHelper::setCurrencySign();
            $orderData['currency_value'] = PriceHelper::setCurrencyValue();
            $orderData['order_status'] = 'Pending';
            $order = Order::create($orderData);
            PriceHelper::Transaction($order->id, $order->transaction_number, EmailHelper::getEmail(), PriceHelper::OrderTotal($order, 'trns'));
            PriceHelper::LicenseQtyDecrese($cart);
            PriceHelper::LicenseQtyDecrese($cart);

            if (Session::has('copon')) {
                $code = PromoCode::find(Session::get('copon')['code']['id']);
                $code->no_of_times--;
                $code->update();
            }

            if ($discount) {
                $coupon_id = $discount['code']['id'];
                $get_coupon = PromoCode::findOrFail($coupon_id);
                $get_coupon->no_of_times -= 1;
                $get_coupon->update();
            }

            TrackOrder::create([
                'title' => 'Pending',
                'order_id' => $order->id,
            ]);

            Notification::create([
                'order_id' => $order->id
            ]);

            $setting = Setting::first();
            if ($setting->is_twilio == 1) {
                // message
                $sms = new SmsHelper();
                $user_number = json_decode($order->billing_info, true)['bill_phone'];
                if ($user_number) {
                    $sms->SendSms($user_number, "'purchase'", $order->transaction_number);
                }
            }

            $emailData = [
                'to' => EmailHelper::getEmail(),
                'type' => "Order",
                'user_name' => isset($user) ? $user->displayName() : Session::get('billing_address')['bill_first_name'],
                'order_cost' => $total_amount,
                'transaction_number' => $order->transaction_number,
                'site_title' => Setting::first()->title,
            ];

            $email = new EmailHelper();
            $email->sendTemplateMail($emailData);

            Session::put('order_id', $order->id);
            Session::forget('cart');
            Session::forget('discount');
            Session::forget('order_data');
            Session::forget('order_payment_id');
            Session::forget('coupon');
            return [
                'status' => true
            ];
        } else {

            return [
                'status' => false,
                'message' => $response->getMessage()
            ];
        }
    }
}
