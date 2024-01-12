<?php

namespace App\Http\Controllers\Payment;

use App\Helpers\EmailHelper;
use App\Helpers\PriceHelper;
use App\Helpers\SmsHelper;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Item;
use App\Models\Notification;
use App\Models\Order;
use App\Models\PaymentSetting;
use App\Models\PromoCode;
use App\Models\Setting;
use App\Models\ShippingService;
use App\Models\State;
use App\Models\TrackOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class FlutterwaveController extends Controller
{
    public $public_key;
    private $secret_key;

    public function __construct()
    {
        $data = PaymentSetting::whereUniqueKeyword('flutterwave')->first();
        $paydata = $data->convertJsonData();
        $this->public_key = $paydata['public_key'];
        $this->secret_key = $paydata['secret_key'];
    }

    public function store(Request $request)
    {
        $request->validate([
            'state_id' => State::whereStatus(1)->count() > 0  ? 'required' : '',
        ]);
        $input = $request->all();
        if(Session::has('currency')){
            $currency = Currency::findOrFail(Session::get('currency'));
        }else{
            $currency = Currency::where('is_default',1)->first();
        }

        $supported = ['NGN','USD'];
        if(!in_array($currency->name,$supported)){
            Session::flash('error',__('Currency Not Supported'));
            return redirect()->back();
        }
       
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
        if(ShippingService::whereStatus(1)->exists()){
            $shipping = ShippingService::whereStatus(1)->first();
        }
        $discount = [];
        if(Session::has('coupon')){
            $discount = Session::get('coupon');
        }
        if (!PriceHelper::Digital()){
            $shipping = null;
        }
        
        $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
        $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
        $grand_total += PriceHelper::StatePrce($request->state_id,$cart_total);
        $total_amount = PriceHelper::setConvertPrice($grand_total);
        // SET CURL

        $curl = curl_init();

        $amount = $total_amount;  
        $currency = $currency->name;
        $txref = Str::random(8); // ensure you generate unique references per transaction.
        $PBFPubKey = $this->public_key; // get your public key from the dashboard.
        $redirect_url = route('front.flutterwave.notify');
        $payment_plan = ""; // this is only required for recurring payments.
        
        
        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode([
            'amount' => $amount,
            'customer_email' => EmailHelper::getEmail(),
            'currency' => $currency,
            'txref' => $txref,
            'PBFPubKey' => $PBFPubKey,
            'redirect_url' => $redirect_url,
            'payment_plan' => $payment_plan
          ]),
          CURLOPT_HTTPHEADER => [
            "content-type: application/json",
            "cache-control: no-cache"
          ],
        ));
        
        $response = curl_exec($curl);

        $err = curl_error($curl);
        
        if($err){
          // there was an error contacting the rave API
          return redirect(route('front.checkout.redirect'))->with('error','Curl returned error: ' . $err);
        }
        
        $transaction = json_decode($response);
        Session::put('requestData',$request->all());
        
        if(!$transaction->data && !$transaction->data->link){
          // there was an error from the API
          return redirect(route('front.checkout.redirect'))->with('error','API returned error: ' . $transaction->message);
        }
        return redirect($transaction->data->link);

    }


    public function notify(Request $request)
    {

        $input_data = $request->all();

        if($request->cancelled == "true"){
            return redirect()->route('front.checkout.redirect')->with('error',__('Payment Cancelled!'));
        }

        if (isset($input_data['txref'])) {
            
            $ref = $input_data['payment_id'];

            $query = array(
                "SECKEY" => $this->secret_key,
                "txref" => $ref
            );

            $data_string = json_encode($query);
                
            $ch = curl_init('https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify');                                                                      
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                              
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    
            $response = curl_exec($ch);
    
            curl_close($ch);
    
            $resp = json_decode($response, true);

            if ($resp['status'] = "success") {
                if(!empty($resp['data'])){

                    $paymentStatus = $resp['data']['status'];
                    $chargeResponsecode = $resp['data']['chargecode'];
            
                    if (($chargeResponsecode == "00" || $chargeResponsecode == "0") && ($paymentStatus == "successful")) {
    
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
                        $requestData = Session::get('requestData');
                        $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
                        $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
                        $total_amount = PriceHelper::setConvertPrice($grand_total);
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
                        $orderData['txnid'] = $resp['data']['txid'];
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

                }
            }
        }
    }

    
}