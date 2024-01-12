<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;

use App\{
    Models\Item,
    Models\Wishlist,
    Http\Controllers\Controller
};

use Auth;
use Illuminate\Support\Facades\Session;

class WishlistController extends Controller
{

    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['store']]);
        $this->middleware('localize');
    }

    public function index()
    {
        $wishlists = Wishlist::whereUserId(Auth::user()->id)->pluck('item_id')->toArray();
        $wishlist_items = Item::where('status','=',1)->whereIn('id',$wishlists)->latest('id')->get();
        return view('user.wishlist.index',compact('wishlist_items'));
    }

    public function store($id)
    {
        $user = Auth::user();

        if($user){
            if(Wishlist::where('user_id','=',$user->id)->where('item_id','=',$id)->exists())
            {
                return response()->json(['status'=>2,'message'=>__('Already Added To Wishlist.')]);
            }
    
            $user->wishlists()->create([
                'item_id' => $id
            ]);
        }else{
            return response()->json(['status'=> 0,'link'=> route('user.login')]);
        }
        return response()->json(['count' => Wishlist::where('user_id','=',$user->id)->count() ,'status'=>1,'message'=>__('Successfully Added To The Wishlist.')]);

    }

    public function delete($id)
    {
        $user = Auth::user();
        $wish = Wishlist::findOrFail($id);
        $wish->delete();
        Session::flash('success',__('Successfully Removed From Wishlist.'));
        return back();
    }

    public function alldelete()
    {
        $user = Auth::user();
        Wishlist::where('user_id',$user->id)->delete();
        Session::flash('success',__('Successfully Removed From Wishlist.'));
        return back();
    }

}
