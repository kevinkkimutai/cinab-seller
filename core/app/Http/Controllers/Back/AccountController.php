<?php

namespace App\Http\Controllers\Back;

use Auth;

use App\{
    Http\Controllers\Controller,
    Http\Requests\ImageUpdateRequest,
    Repositories\Back\AccountRepository
};
use App\Helpers\PriceHelper;
use App\Models\Item;
use App\Models\Order;
use App\Models\Attribute;
use App\Models\AttributeOption;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\AccountRepository $repository
     *
     */
    public function __construct(AccountRepository $repository)
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        $days = "";
        $sales = "";
        for($i = 0; $i < 30; $i++) {
            $days .= "'".date("d M", strtotime('-'. $i .' days'))."',";
            $sales .=  "'".Order::where('order_status','=','Delivered')->whereDate('created_at', '=', date("Y-m-d", strtotime('-'. $i .' days')))->count()."',";
        }


        $earning_days = "";
        $total_incomess = '';
        $income = "";
        $check = 0;
        for($i = 0; $i < 30; $i++) {
            $earning_days .= "'".date("d M", strtotime('-'. $i .' days'))."',";
            $incomes = Order::where('order_status','=','Delivered')->whereDate('created_at', '=', date("Y-m-d", strtotime('-'. $i .' days')))->get();

            if($incomes->count() > 0){
                foreach($incomes as $income){
                    $check += PriceHelper::OrderTotalChart($income);
                }
                $total_incomess .=  "'".$check."',";
            }else{
                $total_incomess .=  "'".'0'."',";
            }
        }

        $earning_days =rtrim($earning_days, ", ");
        $check_income =rtrim($total_incomess, ", ");

        return view('back.dashboard.index',[
            'totalUsers' => $this->repository->getTotalUsers(),
            'totalItems' => $this->repository->getTotalItems(),
            'totalOrders' => $this->repository->getTotalOrders(),
            'totalPendingOrders' => $this->repository->getPendingOrders(),
            'totalDeliveredOrders' => $this->repository->getDeliveredOrders(),
            'totalCanceledOrders' => $this->repository->getCanceledOrders(),
            'recentUsers' => $this->repository->getRecentUsers(),
            'recentOrders' => $this->repository->getRecentOrders(),
            'totalBrand' => $this->repository->getTotalBrand(),
            'totalCategory' => $this->repository->getTotalCategory(),
            'totalReview' => $this->repository->getTotalReview(),
            'totalTransaction' => $this->repository->getTotalTransaction(),
            'totalPendingTicket' => $this->repository->getTotalPendingTicket(),
            'totalTicket' => $this->repository->getTotalTicket(),
            'totalBlog' => $this->repository->getTotalBlog(),
            'totalSubscriber' => $this->repository->getTotalSubscriber(),
            'totalProductSale' => $this->repository->getTotalProductSale(),
            'totalCurrentMonthProductSale' => $this->repository->getcurrentMonthProductSale(),
            'totalTodayProductSale' => $this->repository->getTodayProductSale(),
            'totalLatYearProductSale' => $this->repository->getYearProductSale(),
            'totalEarning' => $this->repository->getTotalEarning(),
            'totalTodayEarning' => $this->repository->getTodayEarning(),
            'totalMonthEarning' => $this->repository->getMonthEarning(),
            'totalYearEarning' => $this->repository->getYearEarning(),
            'totalSystemUserEarning' => $this->repository->getSystemUser(),
            'order_days' => $days,
            'earning_days' => $earning_days,
            'order_sales' => $sales,
            'total_incomess' => $check_income,
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function profileForm()
    {
        $data = Auth::guard('admin')->user();
        return view('back.dashboard.profile',compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(ImageUpdateRequest $request)
    {
        $this->repository->updateProfile($request);
        return redirect()->back()->withSuccess(__('Profile Updated Successfully!'));

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function passwordResetForm()
    {
        return view('back.dashboard.password');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|min:4|max:16',
            'new_password' => 'required|min:4|max:16',
            'renew_password' => 'required|min:4|max:16',
        ]);

        $resp = $this->repository->updatePassword($request);

        if($resp['status']){
            return redirect()->back()->withSuccess($resp['message']);
        }else{
            return redirect()->back()->withErrors($resp['message']);
        }

    }

}
