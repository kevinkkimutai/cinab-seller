<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = ['item_id','name','keyword'];

    public $timestamps = false;

    public function options()
    {
        return $this->hasMany('App\Models\AttributeOption','attribute_id','id');
    }

  


}
