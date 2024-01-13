<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $fillable = ['name','price','status','type'];
    public $timestamps = false;

  
}
