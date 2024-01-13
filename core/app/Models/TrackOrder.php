<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackOrder extends Model
{
    protected $fillable = [
        'title',
        'item_id',
        'order_id'
    ];

    public function order()
    {
    	return $this->belongsTo('App\Models\Order','order_id')->withDefault();
    }
}
