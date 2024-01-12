<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\CampaignItem;
use App\Models\Item;
use Illuminate\Http\Request;

class CampaignController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }


    public function index()
    {
        $datas = Item::whereStatus(1)->select('name','id')->orderBy('id','desc')->get();
        return view('back.item.campaign',[
            'datas' => $datas,
            'items' => CampaignItem::orderby('id','desc')->get()
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'item_id' => 'required'
        ]);
        if(CampaignItem::whereItemId($request->item_id)->exists()){
            return redirect()->route('back.campaign.index')->withError(__('Allready Added This Product.'));

        }
        $data = new CampaignItem();
        $data->create($request->all());
        return redirect()->route('back.campaign.index')->withSuccess(__('New Product Added Successfully.'));

    }


    public function destroy($id)
    {
        $data = CampaignItem::findOrFail($id);
        $data->delete();
        return redirect()->route('back.campaign.index')->withSuccess(__('Product Delete Successfully Successfully.'));
    }



    /**
     * Change the status for editing the specified resource.
     *
     * @param  int  $id
     * @param  int  $status
     * @return \Illuminate\Http\Response
     */
    public function status($id,$status,$type)
    {

        if($type == 'is_feature' && $status == 1){

            if(CampaignItem::whereIsFeature(1)->count() == 10){
                return redirect()->route('back.campaign.index')->withError(__('10 products are allready added to feature'));
            }
        }
        $item = CampaignItem::findOrFail($id);
        $item->update([$type => $status]);
        return redirect()->route('back.campaign.index')->withSuccess(__('Status Updated Successfully.'));
    }


}
