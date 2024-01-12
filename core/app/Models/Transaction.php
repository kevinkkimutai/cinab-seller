<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['order_id','amount','email','txn_id','currency_sign','currency_value'];

    public function order()
    {
    	return $this->belongsTo('App\Models\Order')->withDefault();
    }

    public function user()
    {
    	return $this->hasOne('App\Models\User','email','user_email')->withDefault();
    }

}
