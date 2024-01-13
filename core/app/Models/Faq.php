<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['title', 'details','category_id'];

    public function category()
    {
    	return $this->belongsTo('App\Models\Fcategory')->withDefault();
    }
    public $timestamps = false;
}
