<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Item,
    Models\Gallery,
    Http\Requests\AffiliateRequest,
    Http\Controllers\Controller,
    Http\Requests\GalleryRequest,
    Repositories\Back\ItemRepository
};
use App\Models\Category;
use App\Models\Currency;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class AffiliateController extends Controller
{

    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\ItemRepository $repository
     *
     */
    public function __construct(ItemRepository $repository)
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
        $this->repository = $repository;
    }


    /**
     * Show the form for get subcategory a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getsubCategory(Request $request)
    {

        if($request->category_id){
            $data = Category::findOrFail($request->category_id);
            $data = $data->subcategory;
        }else{
            $data = [];
        }

        return response()->json(['data'=>$data]);
    }

    /**
     * Show the form for get subcategory a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getChildCategory(Request $request)
    {

        if($request->subcategory_id){
            $data = Subcategory::findOrFail($request->subcategory_id);
            $data = $data->childcategory;
        }else{
            $data = [];
        }

        return response()->json(['data'=>$data]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.item.affiliate.create',[
            'curr' => Currency::where('is_default',1)->first()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AffiliateRequest $request)
    {
        $item_id = $this->repository->store($request);

        if($request->is_button ==0){
            return redirect()->route('back.item.index')->withSuccess(__('New Product Added Successfully.'));
        }else{
            return redirect(route('back.item.edit', $item_id))->withSuccess(__('Product Added Successfully.'));
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $affiliate)
    {
        $item = $affiliate;
        return view('back.item.affiliate.edit',[
            'item' => $item,
            'curr' => Currency::where('is_default',1)->first(),
            'social_icons' => json_decode($item->social_icons,true),
            'social_links' => json_decode($item->social_links,true),
            'specification_name' => json_decode($item->specification_name,true),
            'specification_description' => json_decode($item->specification_description,true),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\AffiliateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(AffiliateRequest $request, Item $affiliate)
    {
        $this->repository->update($affiliate, $request);

        if($request->is_button ==0){
            return redirect()->route('back.item.index')->withSuccess(__('Product Updated Successfully.'));
        }else{
            return redirect()->back()->withSuccess(__('Product Updated Successfully.'));
        }

    }

    /**
     * Change the status for editing the specified resource.
     *
     * @param  int  $id
     * @param  int  $status
     * @return \Illuminate\Http\Response
     */
    public function status(Item $affiliate,$status)
    {
        $affiliate->update(['status' => $status]);
        return redirect()->route('back.item.affiliate.index')->withSuccess(__('Status Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $affiliate)
    {
        $this->repository->delete($affiliate);
        return redirect()->route('back.item.affiliate.index')->withSuccess(__('Product Deleted Successfully.'));
    }




}
