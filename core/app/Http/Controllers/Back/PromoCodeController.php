<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\PromoCode,
    Http\Requests\PromoCodeRequest,
    Http\Controllers\Controller
};
use App\Models\Currency;

class PromoCodeController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('back.code.index',[
            'datas' => PromoCode::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.code.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PromoCodeRequest $request)
    {
        $curr = Currency::where('is_default',1)->first();
        $input = $request->all();
        if($input['type'] == 'amount'){
            $input['discount'] = $input['discount'] / $curr->value;
        }
        PromoCode::create($input);
        return redirect()->route('back.code.index')->withSuccess(__('New Promo Code Added Successfully.'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(PromoCode $code)
    {
        $curr = Currency::where('is_default',1)->first();
        return view('back.code.edit',compact('code','curr'));
    }


    /**
     * Change the status for editing the specified resource.
     *
     * @param  int  $id
     * @param  int  $pos
     * @return \Illuminate\Http\Response
     */
    public function status($id,$status)
    {
        PromoCode::find($id)->update(['status' => $status]);
        return redirect()->route('back.code.index')->withSuccess(__('Status Updated Successfully.'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PromoCodeRequest $request, PromoCode $code)
    {
        $curr = Currency::where('is_default',1)->first();
        $input = $request->all();
        if($input['type'] == 'amount'){
            $input['discount'] = $input['discount'] / $curr->value;
        }

        $code->update($input);
        return redirect()->route('back.code.index')->withSuccess(__('Promo Code Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(PromoCode $code)
    {
        $code->delete();
        return redirect()->route('back.code.index')->withSuccess(__('Promo Code Deleted Successfully.'));
    }
}
