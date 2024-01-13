<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    protected $fillable = ['title', 'code_name', 'discount','status','no_of_times','type'];
    public $timestamps = false;
}
