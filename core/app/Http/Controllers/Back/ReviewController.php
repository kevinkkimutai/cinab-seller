<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Review,
    Http\Controllers\Controller
};

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('back.review.index',[
            'datas' => Review::latest('id')->get()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        return view('back.review.show',compact('review'));
    }

    /**
     * Change the status for editing the specified resource.
     *
     * @param  int  $id
     * @param  int  $pos
     * @return \Illuminate\Http\Response
     */
    public function status($id,$status)
    {
        $shipping = Review::find($id)->update(['status' => $status]);
        return redirect()->route('back.review.index')->withSuccess(__('Status Updated Successfully.'));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('back.review.index')->withSuccess(__('Review Deleted Successfully.'));
    }
}
