<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{

    protected $fillable = ['order_id','user_id'];

    public function order()
    {
    	return $this->belongsTo('App\Models\Order')->withDefault();
    }

    public function user()
    {
    	return $this->belongsTo('App\Models\User')->withDefault();
    }

    public static function countRegistration()
    {
        return Notification::where('user_id','!=',null)->where('is_read','=',0)->count();
    }

    public static function countOrder()
    {
        return Notification::where('order_id','!=',null)->where('is_read','=',0)->count();
    }

}
