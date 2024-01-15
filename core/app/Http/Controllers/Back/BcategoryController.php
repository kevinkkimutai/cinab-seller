<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Bcategory,
    Repositories\Back\BcategoryRepository,
    Http\Requests\BcategoryRequest,
    Http\Controllers\Controller
};

class BcategoryController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\BcategoryRepository $repository
     *
     */
    public function __construct(BcategoryRepository $repository)
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
        return view('back.bcategory.index',[
            'datas' => Bcategory::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.bcategory.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BcategoryRequest $request)
    {
        $this->repository->store($request);
        return redirect()->route('back.bcategory.index')->withSuccess(__('New Category Added Successfully.'));
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
        $shipping = Bcategory::find($id)->update(['status' => $status]);
        return redirect()->route('back.bcategory.index')->withSuccess(__('Status Updated Successfully.'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Bcategory $bcategory){
        return view('back.bcategory.edit',compact('bcategory'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BcategoryRequest $request, Bcategory $bcategory)
    {
        $this->repository->update($bcategory, $request);
        return redirect()->route('back.bcategory.index')->withSuccess(__('Category Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bcategory $bcategory)
    {
        $this->repository->delete($bcategory);
        return redirect()->route('back.bcategory.index')->withSuccess(__('Category Deleted Successfully.'));
    }
}
