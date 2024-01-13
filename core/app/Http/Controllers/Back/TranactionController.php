<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
class TranactionController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    // ------- Index -------//

    public function index()
    {
        return view('back.transactions.index',[
            'datas' => Transaction::orderby('id','desc')->get()
        ]);
    }

    // ------- Delete -------//
    public function Delete($id)
    {
        Transaction::findOrFail($id)->delete();
        return redirect()->back()->withSuccess(__('Transaction Updated Successfully.'));
    }
}
