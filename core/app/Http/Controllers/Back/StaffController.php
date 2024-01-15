<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Admin,
    Repositories\Back\StaffRepository,
    Http\Requests\AdminRequest,
    Http\Controllers\Controller
};
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\StaffRepository $repository
     *
     */
    public function __construct(StaffRepository $repository)
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
        return view('back.staff.index',[
            'datas' => Admin::where('id','!=',1)->orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.staff.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:admins|email',
            'phone' => 'required|max:20',
            'password' => 'required|min:4|max:20',
            'role_id' => 'required',
            'photo' => 'required|image',
        ]);
        $this->repository->store($request);
        return redirect()->route('back.staff.index')->withSuccess(__('New User Added Successfully.'));
    }




    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $staff)
    {
        $admin = $staff;
        return view('back.staff.edit',compact('admin'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $staff)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:admins,email,'.$staff->id,
            'phone' => 'required|max:20',
            'password' => 'min:4|max:20',
            'role_id' => 'required',
            'photo' => 'image',
        ]);
        $this->repository->update($staff, $request);
        return redirect()->route('back.staff.index')->withSuccess(__('User Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $staff)
    {
        $this->repository->delete($staff);
        return redirect()->route('back.staff.index')->withSuccess(__('User Deleted Successfully.'));
    }
}
