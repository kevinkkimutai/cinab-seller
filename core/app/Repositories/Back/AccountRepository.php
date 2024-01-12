<?php

namespace App\Repositories\Back;

use Auth;
use App\{
    Models\Post,
    Models\User,
    Models\Order,
    Helpers\ImageHelper,
    Helpers\PriceHelper
};
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Currency;
use App\Models\Item;
use App\Models\Review;
use App\Models\Setting;
use App\Models\Subscriber;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Models\Withdraw;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AccountRepository
{

    /**
     * Update profile.
     *
     * @param  \App\Http\Requests\ImageUpdateRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function updateProfile($request)
    {
        $input = $request->all();
        $data = Auth::guard('admin')->user();
        if ($file = $request->file('photo')) {
            $input['photo'] = ImageHelper::handleUpdatedUploadedImage($file,'/assets/images',$data,'/assets/images/','photo');
        }
        $data->update($input);
    }


    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function updatePassword($request)
    {
        $data = Auth::guard('admin')->user();

        if ($request->current_password){
            if (Hash::check($request->current_password, $data->password)){
                if ($request->new_password == $request->renew_password){
                    $input['password'] = Hash::make($request->new_password);
                }else{
                    return [
                        'status'  => false,
                        'message' => __('Confirm password does not match.')
                    ];
                }
            }else{
                return [
                    'status'  => false,
                    'message' => __('Current password Does not match.')
                ];
            }
        }

        $data->update($input);

        return [
            'status'  => true,
            'message' => __('Successfully changed your password')
        ];

    }

    public function getTotalOrders()
    {
        return Order::count();
    }
    public function getPendingOrders()
    {
        return Order::whereOrderStatus('Pending')->count();
    }
    public function getDeliveredOrders()
    {
        return Order::whereOrderStatus('Delivered')->count();
    }
    public function getCanceledOrders()
    {
        return Order::whereOrderStatus('Canceled')->count();
    }

    public function getTotalProductSale()
    {
        $orders = Order::whereOrderStatus('Delivered')->get();
        $total_items_qty = 0;
        foreach($orders as $order){
            $cart = json_decode($order->cart,true);
            foreach($cart as $item){
                $total_items_qty += $item['qty'];
            }
        }
        return $total_items_qty;
    }

    public function getcurrentMonthProductSale()
    {
        $current_date = Carbon::now();
        $explode = explode('-',$current_date->format('d-m-Y'));
        $explode[0] = '1';
        $implode= implode("-",$explode);
        $first_day = Carbon::parse($implode);
        $orders = Order::whereOrderStatus('Delivered')->whereDate('created_at','>=',$first_day)->whereDate('created_at','<=',$current_date)->get();

        $total_items_qty = 0;
        foreach($orders as $order){
            $cart = json_decode($order->cart,true);
            foreach($cart as $item){
                $total_items_qty += $item['qty'];
            }
        }
        return $total_items_qty;
    }

    public function getTodayProductSale()
    {
        $current_date = Carbon::now();
        $orders = Order::whereDate('created_at','=',$current_date)->get();
        $total_items_qty = 0;
        foreach($orders as $order){
            $cart = json_decode($order->cart,true);
            foreach($cart as $item){
                $total_items_qty += $item['qty'];
            }
        }
        return $total_items_qty;
    }

    public function getYearProductSale()
    {
        $current_date = Carbon::now();
        $explode = explode('-',$current_date->format('d-m-Y'));
        $explode[0] = '1';
        $year = date('Y-m-d', strtotime('today - 365 days'));
        $orders = Order::whereOrderStatus('Delivered')->whereDate('created_at','>=',$year)->whereDate('created_at','<=',$current_date)->get();
        $total_items_qty = 0;
        foreach($orders as $order){
            $cart = json_decode($order->cart,true);
            foreach($cart as $item){
                $total_items_qty += $item['qty'];
            }
        }
        return $total_items_qty;
    }

    public function getTotalEarning()
    {
        $orders = Order::whereOrderStatus('Delivered')->get();
        $total = 0;
        foreach($orders as $order){
            $total += PriceHelper::OrderTotalChart($order);
        }
        $curr = Currency::where('is_default',1)->first();
        $setting = Setting::first();
      
        if($setting->currency_direction == 1){
            return $curr->sign . $total;
        }else{
            return  $total . $curr->sign;
        }
    }

    public function getTodayEarning()
    {
        $current_date = Carbon::now();
        $total = 0;
        $orders = Order::whereDate('created_at','=',$current_date)->get();
        foreach($orders as $order){
            $total += PriceHelper::OrderTotalChart($order);
        }

        $curr = Currency::where('is_default',1)->first();
        $setting = Setting::first();
        if($setting->currency_direction == 1){
            return $curr->sign . $total;
        }else{
            return  $total . $curr->sign;
        }
    }

    public function getMonthEarning()
    {
        $current_date = Carbon::now();
        $explode = explode('-',$current_date->format('d-m-Y'));
        $explode[0] = '1';
        $implode= implode("-",$explode);
        $first_day = Carbon::parse($implode);
        $total = 0;
        $orders = Order::whereOrderStatus('Delivered')->whereDate('created_at','>=',$first_day)->whereDate('created_at','<=',$current_date)->get();

        foreach($orders as $order){
            $total += PriceHelper::OrderTotalChart($order);
        }

        $curr = Currency::where('is_default',1)->first();
        $setting = Setting::first();
        if($setting->currency_direction == 1){
            return $curr->sign . $total;
        }else{
            return  $total . $curr->sign;
        }
    }

    public function getYearEarning()
    {
        $current_date = Carbon::now();
        $explode = explode('-',$current_date->format('d-m-Y'));
        $explode[0] = '1';
        $year = date('Y-m-d', strtotime('today - 365 days'));
        $total = 0;
        $orders = Order::whereOrderStatus('Delivered')->whereDate('created_at','>=',$year)->whereDate('created_at','<=',$current_date)->get();
        foreach($orders as $order){
            $total += PriceHelper::OrderTotalChart($order);
        }

        $curr = Currency::where('is_default',1)->first();
        $setting = Setting::first();
        if($setting->currency_direction == 1){
            return $curr->sign . $total;
        }else{
            return  $total . $curr->sign;
        }
    }

    public function getSystemUser()
    {
        return Admin::where('id','!=',1)->count();
    }


    public function getTotalUsers()
    {
        return User::count();
    }

    public function getTotalItems()
    {
        return Item::count();
    }

    public function getRecentOrders()
    {
        return Order::latest('id')->take(10)->get();
    }

    public function getRecentUsers()
    {
        return User::latest('id')->take(10)->get();
    }

    public function getRecentProducts()
    {
        return Item::latest('id')->take(10)->get();
    }
    public function getTotalCategory()
    {
        return Category::count();
    }
    public function getTotalBrand()
    {
        return Brand::count();
    }
    public function getTotalReview()
    {
        return Review::count();
    }
    public function getTotalTransaction()
    {
        return Transaction::count();
    }
    public function getTotalPendingTicket()
    {
        return Ticket::whereStatus('Pending')->count();
    }
    public function getTotalTicket()
    {
        return Ticket::count();
    }
    public function getTotalBlog()
    {
        return Post::count();
    }
    public function getTotalSubscriber()
    {
        return Subscriber::count();
    }

}
