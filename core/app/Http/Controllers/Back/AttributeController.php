<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Item,
    Models\Attribute,
    Http\Controllers\Controller,
    Http\Requests\AttributeRequest
};

class AttributeController extends Controller
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
    public function index(Item $item)
    {
        return view('back.item.attribute.index',[
            'item'  => $item,
            'datas' => $item->attributes()->orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Item $item)
    {
        return view('back.item.attribute.create',compact('item'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AttributeRequest $request, Item $item)
    {
        Attribute::create($request->all());
        return redirect()->route('back.attribute.index',$item->id)->withSuccess(__('New Attribute Added Successfully.'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item, Attribute $attribute)
    {
        return view('back.item.attribute.edit',compact('item','attribute'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AttributeRequest $request, Item $item, Attribute $attribute)
    {
        $attribute->update($request->all());
        return redirect()->route('back.attribute.index',$item->id)->withSuccess(__('Attribute Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item, Attribute $attribute)
    {
        $attribute->options()->delete();
        $attribute->delete();
        return redirect()->route('back.attribute.index',$item->id)->withSuccess(__('Attribute Deleted Successfully.'));
    }
}
