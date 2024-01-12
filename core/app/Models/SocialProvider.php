<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialProvider extends Model
{
    protected $fillable = ['user_id','provider_id','provider'];


    function user()
    {
        return $this->belongsTo('App\Models\User')->withDefault();
    }
}
