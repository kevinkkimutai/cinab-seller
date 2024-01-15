<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['user_id','item_id','review','rating','status','subject'];

    public function user()
    {
    	return $this->belongsTo('App\Models\User')->withDefault();
    }

    public function item()
    {
    	return $this->belongsTo('App\Models\Item')->withDefault();
    }

    public static function ratings($item_id){
        $stars = Review::whereStatus(1)->whereItemId($item_id)->avg('rating');
        $ratings = number_format((float)$stars, 1, '.', '') * 20;
        return $ratings;
    }


}
