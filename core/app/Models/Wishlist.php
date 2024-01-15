<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{

    protected $fillable = [
        'user_id',
        'item_id'
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo('App\Models\User')->withDefault();
    }

    public function item()
    {
        return $this->belongsTo('App\Models\Item')->withDefault();
    }

    public function getWishlistItemId($id)
    {
        return Wishlist::whereItemId($id)->first()->id;
    }

}
