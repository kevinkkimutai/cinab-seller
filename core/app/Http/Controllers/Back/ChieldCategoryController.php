<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Category,
    Repositories\Back\ChieldCategoryRepository,
    Http\Requests\ChieldcategoryRequest,
    Http\Controllers\Controller
};
use App\Models\ChieldCategory;
use App\Models\Subcategory;

class ChieldCategoryController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\ChieldCategoryRepository $repository
     *
     */
    public function __construct(ChieldCategoryRepository $repository)
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
        return view('back.childcategory.index',[
            'datas' => ChieldCategory::with('category')->orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.childcategory.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChieldcategoryRequest $request)
    {
        $this->repository->store($request);
        return redirect()->route('back.childcategory.index')->withSuccess(__('New Childcategory Added Successfully.'));
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
        ChieldCategory::find($id)->update(['status' => $status]);
        return redirect()->route('back.childcategory.index')->withSuccess(__('Status Updated Successfully.'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(ChieldCategory $childcategory)
    {
        
        return view('back.childcategory.edit',compact('childcategory'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ChieldCategoryRequest $request, ChieldCategory $childcategory)
    {
        $this->repository->update($childcategory, $request);
        return redirect()->route('back.childcategory.index')->withSuccess(__('Childcategory Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ChieldCategory $childcategory)
    {
        $this->repository->delete($childcategory);
        return redirect()->route('back.childcategory.index')->withSuccess(__('Childcategory Deleted Successfully.'));
    }
}
