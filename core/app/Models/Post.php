<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'slug','details', 'photo', 'category_id','tags','meta_keywords','meta_descriptions'];
    public function category()
    {
    	return $this->belongsTo('App\Models\Bcategory')->withDefault();
    }
}
