<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;

class Maintainance
{

    public function handle($request, Closure $next)
    {
        
        $setting = Setting::first();
       if($setting->is_maintainance == 1){
        return redirect(route('front.maintainance'));
       }
       return $next($request);
    }
}
