@extends('master.front')
@section('meta')
    <meta name="keywords" content="{{ $setting->meta_keywords }}">
    <meta name="description" content="{{ $setting->meta_description }}">
@endsection

@section('content')

    @php
        function renderStarRating($rating, $maxRating = 5)
        {
            $fullStar = "<i class = 'far fa-star filled'></i>";
            $halfStar = "<i class = 'far fa-star-half filled'></i>";
            $emptyStar = "<i class = 'far fa-star'></i>";
            $rating = $rating <= $maxRating ? $rating : $maxRating;

            $fullStarCount = (int) $rating;
            $halfStarCount = ceil($rating) - $fullStarCount;
            $emptyStarCount = $maxRating - $fullStarCount - $halfStarCount;

            $html = str_repeat($fullStar, $fullStarCount);
            $html .= str_repeat($halfStar, $halfStarCount);
            $html .= str_repeat($emptyStar, $emptyStarCount);
            $html = $html;
            return $html;
        }
    @endphp


    @if ($extra_settings->is_t4_slider == 1)
        <div  class="hero-area3 hero-area4" >
            <div class="background"></div>
            <div class="heroarea-slider owl-carousel">
                @foreach ($sliders as $slider)
                <a href="{{$slider->link}}">
                    <div  class="item" style="background: url('{{ asset('assets/images/' . $slider->photo) }}')">
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    @endif

    @if ($extra_settings->is_t4_featured_banner == 1)
        <div class="featured-for-home3 mt-60">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12">
                        <a href="{{isset($home_page4_banner['url1']) ? $home_page4_banner['url1'] : ''}}" class="h3-category">
                            <img class="lazy" data-src="{{asset('assets/images/'.$home_page4_banner['img1'])}}" alt="">
                            <h4>{{isset($home_page4_banner['label1']) ? $home_page4_banner['label1'] : ''}}</h4>
                        </a>
                        <a href="{{isset($home_page4_banner['url2']) ? $home_page4_banner['url2'] : ''}}" class="h3-category">
                            <img class="lazy" data-src="{{asset('assets/images/'.$home_page4_banner['img2'])}}" alt="">
                            <h4>{{isset($home_page4_banner['label2']) ? $home_page4_banner['label2'] : ''}}</h4>
                        </a>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 middleImage">
                        <a href="{{isset($home_page4_banner['url3']) ? $home_page4_banner['url3'] : ''}}" class="h3-category">
                            <img class="lazy" data-src="{{asset('assets/images/'.$home_page4_banner['img3'])}}" alt="">
                            <h4>{{isset($home_page4_banner['label3']) ? $home_page4_banner['label3'] : ''}}</h4>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12">
                        <a href="{{isset($home_page4_banner['url4']) ? $home_page4_banner['url4'] : ''}}" class="h3-category">
                            <img src="{{asset('assets/images/'.$home_page4_banner['img4'])}}" alt="">
                            <h4>{{isset($home_page4_banner['label4']) ? $home_page4_banner['label4'] : ''}}</h4>
                        </a>
                        <a href="{{isset($home_page4_banner['url5']) ? $home_page4_banner['url5'] : ''}}" class="h3-category">
                            <img src="{{asset('assets/images/'.$home_page4_banner['img5'])}}" alt="">
                            <h4>{{isset($home_page4_banner['label5']) ? $home_page4_banner['label5'] : ''}}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    @endif


    @if ($extra_settings->is_t4_specialpick == 1)
        <section class="selected-product-section mt-50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title section-title2 section-title3">
                            <h2 class="h3">{{ __('Special Pick') }}</h2>
                        </div>
                        <div class="popular-category theme3">
                            <div class="links">
                                <a data-href="{{route('front.get.product','feature')}}" data-target="type_product_view" href="javascript:;" class="product_get active">{{__('Featured')}}</a>
                                <a data-href="{{route('front.get.product','best')}}" data-target="type_product_view" class="product_get" href="javascript:;">{{__('Best Seller')}}</a>
                                <a data-href="{{route('front.get.product','top')}}" data-target="type_product_view" class="product_get" href="javascript:;">{{__('Top Rated')}}</a>
                                <a data-href="{{route('front.get.product','new')}}" data-target="type_product_view" class="product_get" href="javascript:;">{{__('New Product')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="type_product_view d-none">
                        <img  src="{{asset('assets/images/ajax_loader.gif')}}" alt="">
                    </div>
                    <div class="col-lg-12" id="type_product_view">

                        <div class="features-slider  owl-carousel" >
                            @foreach ($products->orderBy('id','DESC')->get()  as $item)
                                @if ($item->is_type == 'feature')
                                    <div class="slider-item">
                                        <div class="product-card ">
                                            <div class="product-thumb">
                                            @if (!$item->is_stock())
                                                <div class="product-badge bg-secondary border-default text-body
                                                ">{{__('out of stock')}}</div>
                                            @endif
                                            @if($item->previous_price && $item->previous_price !=0)
                                            <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($item)}}</div>
                                            @endif
                                            <img class="lazy" data-src="{{asset('assets/images/'.$item->thumbnail)}}" alt="Product">
                                            <div class="product-button-group"><a class="product-button wishlist_store" href="{{route('user.wishlist.store',$item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                                <a data-target="{{route('fornt.compare.product',$item->id)}}" class="product-button product_compare" href="javascript:;" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                                @include('includes.item_footer',['sitem' => $item])
                                            </div>
                                        </div>
                                            <div class="product-card-inner">
                                            <div class="product-card-body">
                                                <div class="product-category"><a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a></div>
                                                <h3 class="product-title"><a href="{{route('front.product',$item->slug)}}">
                                                    {{ strlen(strip_tags($item->name)) > 35 ? substr(strip_tags($item->name), 0, 35) : strip_tags($item->name) }}
                                                </a></h3>
                                                <div class="rating-stars">
                                                    {!! renderStarRating($item->reviews->avg('rating')) !!}
                                                </div>
                                                <h4 class="product-price">
                                                @if ($item->previous_price != 0)
                                                <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                                                @endif
                                                {{PriceHelper::grandCurrencyPrice($item)}}
                                                </h4>
                                            </div>

                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>

                </div>
            </div>
        </section>
    @endif

    @if ($extra_settings->is_t4_3_column_banner_first == 1)
    <div class="bannner-section mt-60">
        <div class="container ">
            <div class="row gx-3">
                <div class="col-md-4">
                    <a href="{{$banner_first['firsturl1']}}" class="genius-banner">
                        <img src="{{ asset('assets/images/'.$banner_first['img1']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_first['subtitle1']))
                                <p>{{$banner_first['subtitle1']}}</p>
                            @endif
                            @if (isset($banner_first['title1']))
                                <h4>{{$banner_first['title1']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a href="{{$banner_first['firsturl2']}}" class="genius-banner">
                        <img src="{{ asset('assets/images/'.$banner_first['img2']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_first['subtitle2']))
                                <p>{{$banner_first['subtitle2']}}</p>
                            @endif
                            @if (isset($banner_first['title2']))
                                <h4>{{$banner_first['title2']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a href="{{$banner_first['firsturl3']}}" class="genius-banner">
                        <img src="{{ asset('assets/images/'.$banner_first['img3']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_first['subtitle3']))
                                <p>{{$banner_first['subtitle3']}} </p>
                            @endif
                            @if (isset($banner_first['title3']))
                                <h4>{{$banner_first['title3']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    @endif


    @if ($extra_settings->is_t4_flashdeal == 1)
        <div class="flash-sell-new-section mt-50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 ">
                        <div class="section-title section-title2 section-title3section-title section-title2 section-title3">
                            <h2 class="h3">{{ __('Flash Deal') }}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="main-content">
                            <div class="flash-deal-slider owl-carousel" >
                                @foreach ($products->orderBy('id','DESC')->get()  as $item)
                                @if ($item->is_type == 'flash_deal' && $item->date != null)
                                    <div class="slider-item">
                                        <div class="product-card ">
                                            <div class="product-thumb">
                                                @if (!$item->is_stock())
                                                <div class="product-badge bg-secondary border-default text-body
                                                ">{{__('out of stock')}}</div>
                                                @endif
                                                @if($item->previous_price && $item->previous_price !=0)
                                                <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($item)}}</div>
                                                @endif
                                                <img class="lazy" data-src="{{asset('assets/images/'.$item->thumbnail)}}" alt="Product">
                                                <div class="product-button-group"><a class="product-button wishlist_store" href="{{route('user.wishlist.store',$item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                                    <a data-target="{{route('fornt.compare.product',$item->id)}}" class="product-button product_compare" href="javascript:;" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                                    @include('includes.item_footer',['sitem' => $item])
                                                </div>
                                            </div>
                                            <div class="product-card-inner">
                                                <div class="product-card-body">

                                                    <div class="product-category"><a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a></div>
                                                    <h3 class="product-title"><a href="{{route('front.product',$item->slug)}}">
                                                        {{ strlen(strip_tags($item->name)) > 50 ? substr(strip_tags($item->name), 0, 50) : strip_tags($item->name) }}
                                                    </a></h3>
                                                    <div class="rating-stars">
                                                        {!! renderStarRating($item->reviews->avg('rating')) !!}
                                                    </div>
                                                    <h4 class="product-price">
                                                    @if ($item->previous_price != 0)
                                                    <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                                                    @endif

                                                    {{PriceHelper::grandCurrencyPrice($item)}}
                                                    </h4>
                                                    @if (date('d-m-y') != \Carbon\Carbon::parse($item->date)->format('d-m-y'))
                                                    <div class="countdown countdown-alt mb-3" data-date-time="{{ $item->date }}">
                                                    </div>
                                                    @endif
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    @if ($extra_settings->is_t4_3_column_banner_second == 1)
    <div class="bannner-section mt-60">
        <div class="container ">
            <div class="row gx-3">
                <div class="col-md-4">
                    <a href="{{$banner_secend['url1']}}" class="genius-banner">
                        <img class="lazy" data-src="{{ asset('assets/images/'.$banner_secend['img1']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_secend['subtitle1']))
                                <p>{{$banner_secend['subtitle1']}}</p>
                            @endif

                            @if (isset($banner_secend['title1']))
                                <h4>{{$banner_secend['title1']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a href="{{$banner_secend['url2']}}" class="genius-banner">
                        <img class="lazy" data-src="{{ asset('assets/images/'.$banner_secend['img2']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_secend['subtitle2']))
                                <p>{{$banner_secend['subtitle2']}}</p>
                            @endif

                            @if (isset($banner_secend['title2']))
                                <h4> {{$banner_secend['title2']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a href="{{$banner_secend['url3']}}" class="genius-banner">
                        <img class="lazy" data-src="{{ asset('assets/images/'.$banner_secend['img3']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_secend['subtitle3']))
                                <p>{{$banner_secend['subtitle3']}} </p>
                            @endif

                            @if (isset($banner_secend['title3']))
                                <h4>{{$banner_secend['title3']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    @endif

    @if ($extra_settings->is_t4_popular_category == 1)
        @if (count($pupular_cateogry_home4)>0)
            @foreach ($pupular_cateogry_home4 as $popularcategory)

            <div class="flash-sell-area theme2 mt-50">
                <div class="container">
                    <div class="row">
                        <div class="col-xxl-12">
                            <div class="section-title section-title2 section-title3">
                                <h2 class="h3">{{$popularcategory->name}}</h2>
                            </div>
                            <div class="main-content">
                                <div class="features-slider  owl-carousel" >
                                    @foreach ($popularcategory->items  as $item)

                                        <div class="slider-item">
                                            <div class="product-card ">
                                                <div class="product-thumb" >
                                                    @if ($item->is_stock())
                                                    @if($item->is_type == 'new')
                                                    @else
                                                        <div class="product-badge
                                                            @if($item->is_type == 'feature')
                                                            bg-warning
                                                            @elseif($item->is_type == 'new')

                                                            @elseif($item->is_type == 'top')
                                                            bg-info
                                                            @elseif($item->is_type == 'best')
                                                            bg-dark
                                                            @elseif($item->is_type == 'flash_deal')
                                                            bg-success
                                                            @endif
                                                            "> {{   ucfirst(str_replace('_',' ',$item->is_type))   }}
                                                        </div>
                                                    @endif
                                                    @else
                                                <div class="product-badge bg-secondary border-default text-body
                                                ">{{__('out of stock')}}</div>
                                                @endif
                                                    @if($item->previous_price && $item->previous_price !=0)
                                                    <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($item)}}</div>
                                                    @endif
                                                <img class="lazy" data-src="{{asset('assets/images/'.$item->thumbnail)}}" alt="Product">
                                                <div class="product-button-group"><a class="product-button wishlist_store" href="{{route('user.wishlist.store',$item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                                    <a data-target="{{route('fornt.compare.product',$item->id)}}" class="product-button product_compare" href="javascript:;" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                                    @include('includes.item_footer',['sitem' => $item])
                                                </div>
                                            </div>
                                                <div class="product-card-inner">
                                                <div class="product-card-body">

                                                    <div class="product-category"><a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a></div>
                                                    <h3 class="product-title"><a href="{{route('front.product',$item->slug)}}">
                                                        {{ strlen(strip_tags($item->name)) > 35 ? substr(strip_tags($item->name), 0, 35) : strip_tags($item->name) }}
                                                    </a></h3>
                                                    <div class="rating-stars">
                                                        {!! renderStarRating($item->reviews->avg('rating')) !!}
                                                    </div>
                                                    <h4 class="product-price">
                                                    @if ($item->previous_price != 0)
                                                    <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                                                    @endif

                                                    {{PriceHelper::grandCurrencyPrice($item)}}
                                                    </h4>

                                                </div>
                                                </div>
                                            </div>
                                        </div>

                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        @endif
    @endif

    @if ($extra_settings->is_t4_2_column_banner == 1)
    <div class="bannner-section mt-50">
        <div class="container ">
            <div class="row gx-3">
                <div class="col-md-6">
                    <a href="{{$banner_third['url1']}}" class="genius-banner">
                        <img class="lazy" data-src="{{ asset('assets/images/'.$banner_third['img1']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_third['subtitle1']))
                                <p>{{$banner_third['subtitle1']}}</p>
                            @endif
                            @if (isset($banner_third['title1']))
                                <h4>{{$banner_third['title1']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-6">
                    <a href="{{$banner_third['url2']}}" class="genius-banner">
                        <img class="lazy" data-src="{{ asset('assets/images/'.$banner_third['img2']) }}" alt="">
                        <div class="inner-content">
                            @if (isset($banner_third['subtitle2']))
                                <p>{{$banner_third['subtitle2']}} </p>
                            @endif
                            @if (isset($banner_third['title2']))
                                <h4>{{$banner_third['title2']}}</h4>
                            @endif
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    @endif

    @if ($extra_settings->is_t4_blog_section == 1)
        <div class="blog-section-h page_section mt-50 mb-30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title section-title2 section-title3">
                            <h2 class="h3">{{ __('Our Blog') }}</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="home-blog-slider owl-carousel">
                            @foreach ($posts as $post)
                                <div class="slider-item">
                                    <a href="{{route('front.blog.details',$post->slug)}}" class="blog-post">
                                        <div class="post-thumb">
                                            <img class="lazy" data-src="{{ asset('assets/images/' . json_decode($post->photo, true)[array_key_first(json_decode($post->photo, true))]) }}"
                                                alt="Blog Post">
                                            </div>
                                        <div class="post-body">

                                            <h3 class="post-title"> {{ strlen(strip_tags($post->title)) > 55 ? substr(strip_tags($post->title), 0, 55) : strip_tags($post->title) }}
                                            </h3>
                                            <ul class="post-meta">

                                                <li><i class="icon-user"></i>{{ __('Admin') }}</li>
                                                <li><i class="icon-clock"></i>{{ date('jS F, Y', strtotime($post->created_at)) }}</li>
                                            </ul>
                                            <p>{{ strlen(strip_tags($post->details)) > 120 ? substr(strip_tags($post->details), 0, 120) : strip_tags($post->details) }}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    @if ($extra_settings->is_t4_brand_section == 1)
        <section class="brand-section mt-30">
            <div class="container ">
                <div class="row">
                    <div class="col-lg-12 ">
                        <div class="section-title  section-title2 section-title3">
                            <h2 class="h3">{{ __('Popular Brands') }}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="brand-slider owl-carousel">
                            @foreach ($brands as $brand)
                            <div class="slider-item">
                                <a class="text-center" href="{{ route('front.catalog') . '?brand=' . $brand->slug }}">
                                    <img class="d-block hi-50 lazy"
                                    data-src="{{ asset('assets/images/' . $brand->photo) }}"
                                        alt="{{ $brand->name }}" title="{{ $brand->name }}">
                                </a>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endif

    @if ($extra_settings->is_t4_service_section == 1)
        <section class="service-section mt-50 pt-0 mb-30">
            <div class="container">
                <div class="row">
                    @foreach ($services as $service)
                        <div class="col-lg-3 col-sm-6 text-center mb-30">
                            <div class="single-service single-service2">
                                <img class="lazy" data-src="{{ asset('assets/images/'.$service->photo) }}" alt="Shipping">
                                <div class="content">
                                    <h6 class="mb-2">{{ $service->title }}</h6>
                                    <p class="text-sm text-muted mb-0">{{ $service->details }}</p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

@endsection

