<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\User,
    Http\Controllers\Controller
};
use App\Helpers\ImageHelper;
use App\Http\Requests\UserRequest;
use App\Models\Subscriber;
use App\Repositories\Front\UserRepository;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class UserController extends Controller
{

       /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\UserRepository $repository
     *
     */
    public function __construct(UserRepository $repository)
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
        
        return view('back.user.index',[
            'datas' => User::latest()->get()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return view('back.user.show',compact('user'));
    }


    public function update(UserRequest $request)
    {
        $request->validate([
            'password' => 'min:6|max:16|nullable'
        ]);
        $this->repository->profileUpdate($request);
        return redirect()->back()->withSuccess(__('Profile Updated Successfully.'));
        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        ImageHelper::handleDeletedImage($user,'photo','assets/images/');
        $user->delete();
        return redirect()->route('back.user.index')->withSuccess(__('Customer Deleted Successfully.'));
    }
}
