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

class SslCommerzController extends Controller{

    public function store(Request $request){
        
        $request->validate([
            'state_id' => State::whereStatus(1)->count() > 0  ? 'required' : '',
        ]);
        
        if(Session::has('currency')){
            $currency = Currency::findOrFail(Session::get('currency'));
        }else{
            $currency = Currency::where('is_default',1)->first();
        }

        $supported = ['BDT'];
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
        $discount = [];
        if(Session::has('coupon')){
            $discount = Session::get('coupon');
        }

        if (!PriceHelper::Digital()){
            $shipping = null;
        }

        $txnid = "SSLCZ_TXN_".uniqid();
        $orderData['state'] =  $request['state_id'] ? json_encode(State::findOrFail($request['state_id']),true) : null;
        $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
        $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
        $grand_total += PriceHelper::StatePrce($request->state_id,$cart_total);
        $total_amount = PriceHelper::setConvertPrice($grand_total);
        $orderData['cart'] = json_encode($cart,true);
        $orderData['discount'] = json_encode($discount,true);
        $orderData['shipping'] = json_encode($shipping,true);
        $orderData['tax'] = $total_tax;
        $orderData['state_price'] = PriceHelper::StatePrce($request['state_id'],$cart_total);
        $orderData['shipping_info'] = json_encode(Session::get('shipping_address'),true);
        $orderData['billing_info'] = json_encode(Session::get('billing_address'),true);
        $orderData['payment_method'] = 'SSLCommerz';
        $orderData['order_status'] = 'Pending';
        $orderData['user_id'] = isset($user) ? $user->id : 0;
        $orderData['transaction_number'] = Str::random(10);
        $orderData['currency_sign'] = PriceHelper::setCurrencySign();
        $orderData['currency_value'] = PriceHelper::setCurrencyValue();
        $orderData['txnid'] = $txnid;
         
        $order = Order::create($orderData);

        $data = PaymentSetting::whereUniqueKeyword('sslcommerz')->first();
        $gateway = $data->convertJsonData();
        
        $post_data = array();
        $post_data['store_id'] = $gateway['store_id'];
        $post_data['store_passwd'] = $gateway['store_password'];
        $post_data['total_amount'] = $total_amount;
        $post_data['currency'] = 'BDT';
        $post_data['tran_id'] = $txnid;
        $post_data['success_url'] = route('front.sslcommerz.notify');
        $post_data['fail_url'] =  route('front.checkout.cancle');
        $post_data['cancel_url'] =  route('front.checkout.cancle');
        # $post_data['multi_card_name'] = "mastercard,visacard,amexcard";  # DISABLE TO DISPLAY ALL AVAILABLE
        
        $bill_info = Session::get('billing_address');
        # CUSTOMER INFORMATION
        $post_data['cus_name'] = $bill_info['bill_first_name'];
        $post_data['cus_email'] = $bill_info['bill_email'];
        $post_data['cus_add1'] = '';
        $post_data['cus_city'] = '';
        $post_data['cus_postcode'] = '';
        $post_data['cus_country'] = '';
        $post_data['cus_phone'] = $bill_info['bill_phone'];
        $post_data['cus_fax'] = '';
        
        
        
        # REQUEST SEND TO SSLCOMMERZ
        if($gateway['check_sandbox'] == 1){
            $direct_api_url = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";
        }
        else{
        $direct_api_url = "https://securepay.sslcommerz.com/gwprocess/v3/api.php";
        }

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $direct_api_url );
        curl_setopt($handle, CURLOPT_TIMEOUT, 30);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($handle, CURLOPT_POST, 1 );
        curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE); # KEEP IT FALSE IF YOU RUN FROM LOCAL PC
        
        
        $content = curl_exec($handle );
        
        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        
        
        if($code == 200 && !( curl_errno($handle))) {
            curl_close( $handle);
            $sslcommerzResponse = $content;
        } else {
            curl_close( $handle);
            return redirect()->back()->with('unsuccess',"FAILED TO CONNECT WITH SSLCOMMERZ API");
            exit;
        }
        
        # PARSE THE JSON RESPONSE
        $sslcz = json_decode($sslcommerzResponse, true );
        

        if(isset($sslcz['GatewayPageURL']) && $sslcz['GatewayPageURL']!="" ) {
        
                # THERE ARE MANY WAYS TO REDIRECT - Javascript, Meta Tag or Php Header Redirect or Other
                # echo "<script>window.location.href = '". $sslcz['GatewayPageURL'] ."';</script>";
            echo "<meta http-equiv='refresh' content='0;url=".$sslcz['GatewayPageURL']."'>";
            # header("Location: ". $sslcz['GatewayPageURL']);
            exit;
        } else {
            return redirect()->back()->with('unsuccess',"JSON Data parsing error!");

        }


        
    }


    public function notify(Request $request)
    {
        $input = $request->all();

        // dd($response);
        if($input['status'] == 'VALID'){
            $order = Order::where('txnid',$input['tran_id'])->first();
            if (isset($order)) {
                $data['payment_status'] = 'Paid';
                $order->update($data);
                
                TrackOrder::create([
                    'title' => 'Pending',
                    'order_id' => $order->id,
                ]);
                
          
                $user = Auth::user();
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
                
                $grand_total = ($cart_total + ($shipping?$shipping->price:0)) + $total_tax;
                $grand_total = $grand_total - ($discount ? $discount['discount'] : 0);
                $total_amount = PriceHelper::setConvertPrice($grand_total);
                
                
                PriceHelper::Transaction($order->id,$order->transaction_number,EmailHelper::getEmail(),PriceHelper::OrderTotal($order,'trns'));
                PriceHelper::LicenseQtyDecrese($cart);
                PriceHelper::LicenseQtyDecrese($cart);

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
        
               
                Session::put('order_id',$order->id);
                Session::forget('cart');
                Session::forget('discount');
                Session::forget('coupon');
                if($discount){
                    $coupon_id = $discount['code']['id'];
                    $get_coupon = PromoCode::findOrFail($coupon_id);
                    $get_coupon->no_of_times -= 1;
                    $get_coupon->update();
                }
                $setting = Setting::first();
                if($setting->is_twilio == 1){
                    // message
                    $sms = new SmsHelper();
                    $user_number = json_decode($order->billing_info,true)['bill_phone'];
                    if($user_number){
                        $sms->SendSms($user_number,"'purchase'",$order->transaction_number);
                    }
                }
                return redirect()->route('front.checkout.success');

            }else{
                return redirect()->route('front.checkout.cancle');
            }
        }else{
            return redirect()->route('front.checkout.cancle');
        }
    }

}