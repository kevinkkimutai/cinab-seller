<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Currency,
    Repositories\Back\CurrencyRepository,
    Http\Requests\CurrencyRequest,
    Http\Controllers\Controller
};

class CurrencyController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\CurrencyRepository $repository
     *
     */
    public function __construct(CurrencyRepository $repository)
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
        return view('back.currency.index',[
            'datas' => Currency::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.currency.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CurrencyRequest $request)
    {
        $this->repository->store($request);
        return redirect()->route('back.currency.index')->withSuccess(__('New Currency Added Successfully.'));
    }

    /**
     * Change the status for editing the specified resource.
     *
     * @param  int  $id
     * @param  int  $status
     * @return \Illuminate\Http\Response
     */
    public function status($id,$status)
    {
        Currency::find($id)->update(['is_default' => $status]);
        $data = Currency::where('id','!=',$id)->update(['is_default' => 0]);
        return redirect()->route('back.currency.index')->withSuccess(__('Status Updated Successfully.'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Currency $currency)
    {
        return view('back.currency.edit',compact('currency'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CurrencyRequest $request, Currency $currency)
    {
        $this->repository->update($currency, $request);
        return redirect()->route('back.currency.index')->withSuccess(__('Currency Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Currency $currency)
    {
        $this->repository->delete($currency);
        return redirect()->route('back.currency.index')->withSuccess(__('Currency Deleted Successfully.'));
    }
}
