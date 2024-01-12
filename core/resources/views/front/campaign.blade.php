@extends('master.front')

@section('title')
    {{__('Campaign Product')}}
@endsection

@section('meta')
<meta name="keywords" content="{{$setting->meta_keywords}}">
<meta name="description" content="{{$setting->meta_description}}">
@endsection

@section('content')
<div class="page-title">
    <div class="container">
      <div class="row">
          <div class="col-lg-12">
            <ul class="breadcrumbs">
                <li><a href="{{route('front.index')}}">{{__('Home')}}</a>
                </li>
                <li class="separator"></li>
                <li><a href="{{route('front.campaign')}}">{{__('Campaign Products')}}</a>
                </li>
              </ul>
          </div>
      </div>
    </div>
  </div>
  <!-- Page Content-->

    @php
    function renderStarRating($rating,$maxRating=5) {

            $fullStar = "<i class = 'far fa-star filled'></i>";
            $halfStar = "<i class = 'far fa-star-half filled'></i>";
            $emptyStar = "<i class = 'far fa-star'></i>";
        $rating = $rating <= $maxRating?$rating:$maxRating;

        $fullStarCount = (int)$rating;
        $halfStarCount = ceil($rating)-$fullStarCount;
        $emptyStarCount = $maxRating -$fullStarCount-$halfStarCount;

        $html = str_repeat($fullStar,$fullStarCount);
        $html .= str_repeat($halfStar,$halfStarCount);
        $html .= str_repeat($emptyStar,$emptyStarCount);
        $html = $html;
        return $html;
    }
    @endphp
    <div class="deal-of-day-section pb-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2 class="h3">{{ $setting->campaign_title }}</h2>
                        <div class="right-area">
                                <div class="countdown countdown-alt" data-date-time="{{$setting->campaign_end_date}}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-3">
                @foreach ($campaign_items as $compaign_item)
                <div class="col-gd">
                <div class="product-card">
                    <div class="product-thumb">
                        @if ($compaign_item->item->is_stock())
                            <div class="product-badge
                            @if($compaign_item->item->is_type == 'feature')
                            bg-warning
                            @elseif($compaign_item->item->is_type == 'new')

                            @elseif($compaign_item->item->is_type == 'top')
                            bg-info
                            @elseif($compaign_item->item->is_type == 'best')
                            bg-dark
                            @elseif($compaign_item->item->is_type == 'flash_deal')
                            bg-success
                            @endif
                            ">
                            {{   ucfirst(str_replace('_',' ',$compaign_item->item->is_type))   }}
                            </div>

                            @else
                            <div class="product-badge bg-secondary border-default text-body
                            ">{{__('out of stock')}}</div>
                            @endif

                            @if($compaign_item->previous_price && $compaign_item->previous_price !=0)
                            <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($compaign_item->item)}}</div>
                            @endif

                       <a href="{{route('front.product',$compaign_item->item->slug)}}">
                           <img src="{{asset('assets/images/'.$compaign_item->item->thumbnail)}}" alt="Product">
                       </a>

                        <div class="product-button-group">
                            <a class="product-button wishlist_store" href="{{route('user.wishlist.store',$compaign_item->item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                            <a data-target="{{route('fornt.compare.product',$compaign_item->item->id)}}" class="product-button product_compare" href="javascript:;" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                            @include('includes.item_footer',['sitem' => $compaign_item->item])
                        </div>
                    </div>
                    <div class="product-card-body">

                        <div class="product-category"><a href="{{route('front.catalog').'?category='.$compaign_item->item->category->slug}}">{{$compaign_item->item->category->name}}</a></div>
                        <h3 class="product-title"><a href="{{route('front.product',$compaign_item->item->slug)}}">
                            {{ strlen(strip_tags($compaign_item->item->name)) > 35 ? substr(strip_tags($compaign_item->item->name), 0, 35) : strip_tags($compaign_item->item->name) }}
                        </a></h3>
                        <div class="rating-stars">
                            {!! renderStarRating($compaign_item->item->reviews->avg('rating')) !!}
                        </div>
                        <h4 class="product-price">
                        @if ($compaign_item->item->previous_price != 0)
                        <del>{{PriceHelper::setPreviousPrice($compaign_item->item->previous_price)}}</del>
                        @endif
                        {{--{{PriceHelper::grandCurrencyPrice($compaign_item->item)}}--}}
                            @if ($compaign_item->item->previous_price != 0)
                               <span class="product-priceDiscounted">{{PriceHelper::grandCurrencyPrice($compaign_item->item)}}</span>
                            @else
                                {{PriceHelper::grandCurrencyPrice($compaign_item->item)}}
                            @endif
                        </h4>

                       {{-- <h4 class="product-priceDiscounted">
                            @if ($compaign_item->item->previous_price != 0)
                                {{PriceHelper::grandCurrencyPrice($compaign_item->item)}}
                            @else
                                {{PriceHelper::grandCurrencyPrice($compaign_item->item)}}
                            @endif
                        </h4>--}}

                    </div>

                </div>
            </div>
                @endforeach
            </div>
        </div>
    </div>



@endsection
