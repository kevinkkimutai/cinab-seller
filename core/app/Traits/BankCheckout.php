<?php

namespace App\Traits;

use App\{
    Models\Order,
    Models\Setting,
    Models\TrackOrder,
    Helpers\EmailHelper,
    Helpers\PriceHelper,
    Models\Notification,
};
use App\Helpers\SmsHelper;
use App\Models\Item;
use App\Models\PromoCode;
use App\Models\ShippingService;
use App\Models\State;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

trait BankCheckout
{

    public function BankSubmit($data){
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
        $grand_total += PriceHelper::StatePrce($data['state_id'],$cart_total);
        $total_amount = PriceHelper::setConvertPrice($grand_total);

        $orderData['state'] =  $data['state_id'] ? json_encode(State::findOrFail($data['state_id']),true) : null;
        $orderData['cart'] = json_encode($cart,true);
        $orderData['discount'] = json_encode($discount,true);
        $orderData['shipping'] = json_encode($shipping,true);
        $orderData['tax'] = $total_tax;
        $orderData['state_price'] = PriceHelper::StatePrce($data['state_id'],$cart_total);
        $orderData['shipping_info'] = json_encode(Session::get('shipping_address'),true);
        $orderData['billing_info'] = json_encode(Session::get('billing_address'),true);
        $orderData['payment_method'] = 'Bank Transfer';
        $orderData['user_id'] = isset($user) ? $user->id : 0;
        $orderData['transaction_number'] = Str::random(10);
        $orderData['currency_sign'] = PriceHelper::setCurrencySign();
        $orderData['currency_value'] = PriceHelper::setCurrencyValue();
        $orderData['payment_status'] = 'Unpaid';
        $orderData['txnid'] = $data['txn_id'];
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
        return [
            'status' => true
        ];
    }

}
