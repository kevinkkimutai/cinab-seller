<?php

namespace App\Http\Middleware;
use Auth;
use Closure;

class Permission
{

    public function handle($request, Closure $next,$data)
    {
        if (Auth::guard('admin')->check()) {
            if(Auth::guard('admin')->user()->id == 1){
                return $next($request);
            }
            if(Auth::guard('admin')->user()->role_id == 0){
                return redirect()->route('back.dashboard')->with('success',"You don't have access to that section"); 
            }
            Auth::guard('admin')->user()->sectionCheck($data);
            if (Auth::guard('admin')->user()->sectionCheck($data)){
                return $next($request);
            }
        }
        return redirect()->route('back.dashboard')->with('success',"You don't have access to that section"); 
    }
}
