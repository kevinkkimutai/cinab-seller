<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeCutomize extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'banner_first',
        'banner_secend',
        'banner_third',
        'popular_category',
        'two_column_category',
        'feature_category',
        'home_page4',
        'home_4_popular_category',
    ];
}
