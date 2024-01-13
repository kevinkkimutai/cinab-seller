<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Fcategory,
    Repositories\Back\FcategoryRepository,
    Http\Requests\FcategoryRequest,
    Http\Controllers\Controller
};

class FcategoryController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\FcategoryRepository $repository
     *
     */
    public function __construct(FcategoryRepository $repository)
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
        return view('back.fcategory.index',[
            'datas' => Fcategory::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.fcategory.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FcategoryRequest $request)
    {
        $this->repository->store($request);
        return redirect()->route('back.fcategory.index')->withSuccess(__('New Category Added Successfully.'));
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
        Fcategory::find($id)->update(['status' => $status]);
        return redirect()->route('back.fcategory.index')->withSuccess(__('Status Updated Successfully.'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Fcategory $fcategory)
    {
        return view('back.fcategory.edit',compact('fcategory'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FcategoryRequest $request, Fcategory $fcategory)
    {
        $this->repository->update($fcategory, $request);
        return redirect()->route('back.fcategory.index')->withSuccess(__('Category Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fcategory $fcategory)
    {
        $this->repository->delete($fcategory);
        return redirect()->route('back.fcategory.index')->withSuccess(__('Category Deleted Successfully.'));
    }
}
