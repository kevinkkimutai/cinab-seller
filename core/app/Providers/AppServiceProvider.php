<?php

namespace App\Providers;

use Illuminate\
    {
        Support\ServiceProvider,
        Support\Facades\DB
    };
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Paginator::useBootstrap();
        view()->composer('*',function($settings){
            $settings->with('setting', DB::table('settings')->find(1));
            $settings->with('extra_settings', DB::table('extra_settings')->find(1));

            if (!session()->has('popup'))
            {
                view()->share('visit', 1);
            }
            session()->put('popup' , 1);
        });
    }

    public function register()
    {

    }
}
