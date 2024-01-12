<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExtraSetting extends Model
{
    protected $fillable = [
        'is_t4_slider',
        'is_t4_featured_banner',
        'is_t4_specialpick',
        'is_t4_3_column_banner_first',
        'is_t4_flashdeal',
        'is_t4_3_column_banner_second',
        'is_t4_popular_category',
        'is_t4_2_column_banner',
        'is_t4_blog_section',
        'is_t4_brand_section',
        'is_t4_service_section',
        'is_t3_slider',
        'is_t3_service_section',
        'is_t3_3_column_banner_first',
        'is_t3_popular_category',
        'is_t3_flashdeal',
        'is_t3_3_column_banner_second',
        'is_t3_pecialpick',
        'is_t3_brand_section',
        'is_t3_2_column_banner',
        'is_t3_blog_section',
        'is_t2_slider',
        'is_t2_service_section',
        'is_t2_3_column_banner_first',
        'is_t2_flashdeal',
        'is_t2_new_product',
        'is_t2_3_column_banner_second',
        'is_t2_featured_product',
        'is_t2_bestseller_product',
        'is_t2_toprated_product',
        'is_t2_2_column_banner',
        'is_t2_blog_section',
        'is_t2_brand_section',
        'is_t3_three_column_category',
        'is_t2_three_column_category',
        'is_t1_falsh',
        'is_t2_falsh',
        'is_t3_falsh',
        'is_t4_falsh'
    ];

    public $timestamps = false;
}
