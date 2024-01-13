<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignItem extends Model
{
    public $timestamps = false;
    protected $fillable = ['item_id', 'status','is_feature'];

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
