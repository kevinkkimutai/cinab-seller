<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSetting extends Model
{
    protected $fillable = ['name', 'type', 'information','unique_keyword','status','photo','text'];
    public $timestamps = false;

    public function convertJsonData(){
        return  json_decode($this->information,true);
    }

}
