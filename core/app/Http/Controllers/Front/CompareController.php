<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CompareController extends Controller
{

    public function __construct()
    {
        $this->middleware('localize');
    }
    
    public function compare($id)
    {


        if(Session::has('compare')){

            if(count(Session::get('compare')) <2){
                $compares = Session::get('compare');
                if(in_array($id,$compares)){
                $status = 0;
                $mgs = __('This product already added to compare');
                return response()->json(['message'=>$mgs,'status'=>$status]);
                }
                 array_push($compares,$id);
                Session::put('compare',$compares);
                $status = 1;
                $mgs = __('Compare added successfully');
            }else{
                $compares = Session::get('compare');
                $status = 0;
                $mgs = __('already added 2 compare product');
            }

        }else{
            $compares = array($id);
            Session::put('compare',$compares);
            $status = 1;
            $mgs = __('Compare added successfully');
        }

        return response()->json(['message'=>$mgs,'status'=>$status,'compare_count'=>count($compares)]);
    }


    public function compare_product()
    {

        if(Session::has('compare')){
            $sname = [];
            $sdesc = [];
            $ids = Session::get('compare');
            foreach($ids as $key => $id){
                $item = Item::findOrFail($id);
                $items[] = $item;
                if(!empty($item->specification_name)){
                    $sname =  array_unique(array_merge($sname,json_decode($item->specification_name,true)));
                    $sdesc[] =  json_decode($item->specification_description,true);
                }else{
                    $sname = [];
                    $sdesc = [];
                }
            }
        }else{
            $items = [];
            $sname = [];
            $sdesc = [];
        }
    
        return view('front.compare',[
            'items' => $items,
            'sname'  =>$sname,
            'sdesc'  => $sdesc
        ]);
    }



    public function compareRemove($itemId)
    {
        $ids = Session::get('compare');
        $newIds = [];
        foreach($ids as $id){
            if($itemId != $id){
                $newIds[] = $id;
            }
        }


        if(!count($newIds) == 0){
            Session::put('compare',$newIds);
            return true;
        }else{
            Session::forget('compare');
            return true;
        }


    }
}
