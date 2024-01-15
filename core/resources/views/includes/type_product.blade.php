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
<div class="features-slider  owl-carousel" >
    @foreach ($items  as $item)
        <div class="slider-item">
            <div class="product-card ">
                <div class="product-thumb" >
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
                        @if ($item->previous_price !=0)
                        <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                        @endif
                       {{-- {{PriceHelper::grandCurrencyPrice($item)}}--}}
                            @if ($item->previous_price !=0)
                                <span class="product-priceDiscounted"> {{PriceHelper::grandCurrencyPrice($item)}}</span>
                            @else
                                {{PriceHelper::grandCurrencyPrice($item)}}
                            @endif
                    </h4>
                </div>

                </div>
            </div>
        </div>
    @endforeach
</div>

<script type="text/javascript" src="{{asset('assets/front/js/extraindex.js')}}"></script>
