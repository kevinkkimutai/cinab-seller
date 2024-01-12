<?php

namespace App\Http\Controllers\Payment;

use App\Helpers\EmailHelper;
use App\Models\Order;
use Razorpay\Api\Api;
use Illuminate\Http\Request;
use App\Helpers\PriceHelper;
use App\Helpers\SmsHelper;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Item;
use App\Models\Notification;
use App\Models\PaymentSetting;
use App\Models\PromoCode;
use App\Models\Setting;
use App\Models\ShippingService;
use App\Models\State;
use App\Models\TrackOrder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class RazorpayController extends Controller
{

    public function __construct()
    {
        $data = PaymentSetting::whereUniqueKeyword('razorpay')->first();
        $paydata = $data->convertJsonData();
        $this->keyId = $paydata['key'];
        $this->keySecret = $paydata['secret'];
        $this->displayCurrency = 'INR';
        $this->api = new Api($this->keyId, $this->keySecret);
    }

    public function store(Request $request)
    {
        $request->validate([
            'state_id' => State::whereStatus(1)->count() > 0  ? 'required' : '',
        ]);
        if(Session::has('currency')){
            $currency = Currency::findOrFail(Session::get('currency'));
        }else{
            $currency = Currency::where('is_default',1)->first();
        }

        $supported = ['INR'];
        if(!in_array($currency->name,$supported)){
            Session::flash('error',__('Currency Not Supported'));
            return redirect()->back();
        }
        $user = Auth::user();
        $setting = Setting::first();
        $cart = Session::get('cart');

        $total_tax = 0;
        $cart_total = 0;
        $total = 0;
        $option_price = 0;
        foreach($cart as $key => $item){

            $total += $item['main_price'] * $item['qty'];
            $option_price += $item['attribute_price'];
            $cart_total = $total + $option_price;
            $item = Item::findOrFail($key);
            if($item->tax){
                $total_tax += $item::taxCalculate($item);
            }
        }
        $shipping = [];
        if(ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->exists()){
            $shipping = ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->first();
            if($cart_total >= $shipping->minimum_price){
                $shipping = $shipping;
            }else{
                $shipping = [];
            }
        }

        if(!$shipping){
            $shipping = ShippingService::whereStatus(1)->where('id','!=',1)->first(); 
        }

        if (!PriceHelper::Digital()){
            $shipping = null;
        }
        
        $discount = [];
        if(Session::has('coupon')){
            $discount = Session::get('coupon');
        }
        
        $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
        $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
        $grand_total += PriceHelper::StatePrce($request->state_id,$cart_total);
        $total_amount = PriceHelper::setConvertPrice($grand_total);
        $item_number = Str::random(8);
        $item_name = $setting->title.' Order';
        
        $orderData = [
            'receipt'         => $item_number,
            'amount'          => $total_amount * 100, // 2000 rupees in paise
            'currency'        => 'INR',
            'payment_capture' => 1 // auto capture
        ];
        
        $razorpayOrder = $this->api->order->create($orderData);
        
        $razorpayOrderId = $razorpayOrder['id'];
        
        session(['razorpay_order_id'=> $razorpayOrderId]);
        
             

                    $displayAmount = $amount = $orderData['amount'];
                    
                    if ($this->displayCurrency !== 'INR')
                    {
                        $url = "https://api.fixer.io/latest?symbols=$this->displayCurrency&base=INR";
                        $exchange = json_decode(file_get_contents($url), true);
                    
                        $displayAmount = $exchange['rates'][$this->displayCurrency] * $amount / 100;
                    }
                    
                    $checkout = 'automatic';
                    
                    if (isset($_GET['checkout']) and in_array($_GET['checkout'], ['automatic', 'manual'], true))
                    {
                        $checkout = $_GET['checkout'];
                    }
                    
                    $data = [
                        "key"               => $this->keyId,
                        "amount"            => $amount,
                        "name"              => $item_name,
                        "description"       => $item_name,
                        "prefill"           => [
							"name"              => $request->name,
							"email"             => $request->email,
							"contact"           => $request->phone,
                        ],
                        "notes"             => [
							"address"           => $request->address,
							"merchant_order_id" => $item_number,
                        ],
                        "theme"             => [
							"color"             => "{{$setting->primary_color}}"
                        ],
                        "order_id"          => $razorpayOrderId,
                    ];
                    
                    if ($this->displayCurrency !== 'INR')
                    {
                        $data['display_currency']  = $this->displayCurrency;
                        $data['display_amount']    = $displayAmount;
                    }
                    $notify_url = route('front.razorpay.notify');
                    $json = json_encode($data);
                    $displayCurrency = $this->displayCurrency;
                    Session::put('requestData',$request->all());
                    
        return view( 'front.razorpay-checkout', compact( 'data','displayCurrency','json','notify_url' ) );
        
    }

    
	public function notify( Request $request ) {
        
        $success = true;
        $error = "Payment Failed";
        if (empty($_POST['razorpay_payment_id']) === false)
        {
            try
            {
                $attributes = array(
                    'razorpay_order_id' => session('razorpay_order_id'),
                    'razorpay_payment_id' => $_POST['razorpay_payment_id'],
                    'razorpay_signature' => $_POST['razorpay_signature']
                );
                $this->api->utility->verifyPaymentSignature($attributes);
            }
            catch(SignatureVerificationError $e)
            {
                $success = false;
                $error = 'Razorpay Error : ' . $e->getMessage();
            }
        }
   
        if ($success)
        {
            $transaction_id = $_POST['razorpay_payment_id'];
            
                $user = Auth::user();
                $setting = Setting::first();
                $cart = Session::get('cart');
                $total_tax = 0;
                $cart_total = 0;
                $total = 0;
                $option_price = 0;
                foreach($cart as $key => $item){
        
                    $total += $item['main_price'] * $item['qty'];
                    $option_price += $item['attribute_price'];
                    $cart_total = $total + $option_price;
                    $item = Item::findOrFail($key);
                    if($item->tax){
                        $total_tax += $item::taxCalculate($item);
                    }
                }
                $shipping = [];
                if(ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->exists()){
                    $shipping = ShippingService::whereStatus(1)->whereId(1)->whereIsCondition(1)->first();
                    if($cart_total >= $shipping->minimum_price){
                        $shipping = $shipping;
                    }else{
                        $shipping = [];
                    }
                }
        
                if(!$shipping){
                    $shipping = ShippingService::whereStatus(1)->where('id','!=',1)->first(); 
                }
                $discount = [];
                if(Session::has('coupon')){
                    $discount = Session::get('coupon');
                }
                $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
                $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
                $total_amount = PriceHelper::setConvertPrice($grand_total);
                $requestData = Session::get('requestData');
                $orderData['state'] =  $requestData['state_id'] ? json_encode(State::findOrFail($requestData['state_id']),true) : null;
                $orderData['cart'] = json_encode($cart,true);
                $orderData['discount'] = json_encode($discount,true);
                $orderData['shipping'] = json_encode($shipping,true);
                $orderData['tax'] = $total_tax;
                $orderData['state_price'] = PriceHelper::StatePrce($requestData['state_id'],$cart_total);
                $orderData['shipping_info'] = json_encode(Session::get('shipping_address'),true);
                $orderData['billing_info'] = json_encode(Session::get('billing_address'),true);
                $orderData['payment_method'] = 'Rezorpay';
                $orderData['user_id'] = isset($user) ? $user->id : 0;
                $orderData['transaction_number'] = Str::random(10);
                $orderData['currency_sign'] = PriceHelper::setCurrencySign();
                $orderData['currency_value'] = PriceHelper::setCurrencyValue();
                $orderData['payment_status'] = 'Paid';
                $orderData['txnid'] = $transaction_id;
                $orderData['order_status'] = 'Pending';
                $order = Order::create($orderData);
                TrackOrder::create([
                    'title' => 'Pending',
                    'order_id' => $order->id,
                ]);
        
                PriceHelper::Transaction($order->id,$order->transaction_number,EmailHelper::getEmail(),PriceHelper::OrderTotal($order,'trns'));
                PriceHelper::LicenseQtyDecrese($cart);
                PriceHelper::stockDecrese();
                Notification::create([
                    'order_id' => $order->id
                ]);
        
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
        
                if($discount){
                    $coupon_id = $discount['code']['id'];
                    $get_coupon = PromoCode::findOrFail($coupon_id);
                    $get_coupon->no_of_times -= 1;
                    $get_coupon->update();
                }
        
                if($setting->is_twilio == 1){
                    // message
                    $sms = new SmsHelper();
                    $user_number = json_decode($order->billing_info,true)['bill_phone'];
                    if($user_number){
                        $sms->SendSms($user_number,"'purchase'",$order->transaction_number);
                    }
                }
                
                Session::put('order_id',$order->id);
                Session::forget('cart');
                Session::forget('discount');
                Session::forget('coupon');
                return redirect()->route('front.checkout.success');
            
        }
        else
        {
            return redirect()->route('front.checkout.cancle')->withError($error);
        }
        
    }
    

}
