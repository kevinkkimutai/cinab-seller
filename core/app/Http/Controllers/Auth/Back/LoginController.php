<?php

namespace App\Http\Controllers\Auth\Back;

use App\{
    Http\Controllers\Controller,
    Http\Requests\AuthRequest,
};
use Auth;

class LoginController extends Controller
{
    public function __construct()
    {
      $this->middleware('guest:admin', ['except' => ['logout']]);
    }

    public function showForm()
    {
      return view('back.auth.login');
    }

    public function login(AuthRequest $request)
    {
      // Attempt to log the user in
      if (Auth::guard('admin')->attempt(['email' => $request->login_email, 'password' => $request->login_password])) {
        // if successful, then redirect to their intended location
        return redirect()->intended(route('back.dashboard'));
      }

      // if unsuccessful, then redirect back to the login with the form data
      return redirect()->back()->withErrors(__('Email Or Password Doesn\'t Match !'))->withInput($request->except('password'));
    }

    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('/');
    }
}
