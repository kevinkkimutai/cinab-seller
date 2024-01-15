<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Post;
use App\Models\Transaction;
use App\Repositories\Back\ItemRepository;
use Illuminate\Http\Request;

class BulkDeleteController extends Controller
{
     /**
     * Constructor Method.
     *
     * BulkDeleteController Authentication
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    public function bulkDelete(Request $request)
    {
       $ids = array_filter($request->ids);
        if(!$ids){
            return redirect()->back()->withError(__('Selected is empty'));
        }
        
            $ids = explode(',',$ids[0]);
           
            if($request->table == 'items'){
                $ItemRepository = new ItemRepository();
                foreach($ids as $id){
                    $id = (int)$id;
                    $item = Item::findOrFail($id);
                    $ItemRepository->delete($item);
                }
            } 
  
            if($request->table == 'transactions'){
                foreach($ids as $id){
                    $id = (int)$id;
                    Transaction::findOrFail($id)->delete();
                }
            } 

            if($request->table == 'posts'){
                foreach($ids as $id){
                    $id = (int)$id;
                    $post = Post::findOrFail($id);
                    $images = json_decode($post->photo,true);
                    foreach($images as $image){
                        //if (file_exists(base_path('../').'assets/images/'.$image)) {
                        if (file_exists(public_path('/').'assets/images/'.$image)) {
                           // unlink(base_path('../').'assets/images/'.$image);
                            unlink(public_path('/').'assets/images/'.$image);
                        }
                    }
                    $post->delete();
                }
            } 

            if($request->table == 'orders'){
                foreach($ids as $id){
                    $id = (int)$id;
                    $order = Order::findOrFail($id);
                    $order->tranaction->delete();
                    if(Notification::where('order_id',$id)->exists()){
                        Notification::where('order_id',$id)->delete();
                    }
                    if(count($order->tracks_data)>0){
                        foreach($order->tracks_data as $track){
                            $track->delete();
                        }
                    }
                    $order->delete();
                    
                }
            } 

            return redirect()->back()->withSuccess(__('Data Deleted Successfully.'));
    }
}
