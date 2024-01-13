
    <!-- Shop Toolbar-->
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

        <script type="text/javascript" src="{{asset('assets/front/js/lazy.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/front/js/lazy.plugin.js')}}"></script>

        <div class="row g-3" id="main_div">
            @if($items->count() > 0)
                @if ($checkType != 'list')
                    @foreach ($items as $item)
                    <div class="col-xxl-3 col-md-4 col-6">
                        <div class="product-card ">
                            @if ($item->is_stock())
                                <div class="product-badge
                                    @if($item->is_type == 'feature')
                                    bg-warning
                                    @elseif($item->is_type == 'new')
                                    bg-danger
                                    @elseif($item->is_type == 'top')
                                    bg-info
                                    @elseif($item->is_type == 'best')
                                    bg-dark
                                    @elseif($item->is_type == 'flash_deal')
                                    bg-success
                                    @endif
                                    "> {{  $item->is_type != 'undefine' ?  (str_replace('_',' ',__("$item->is_type"))) : ''   }}
                                </div>
                            @else
                            <div class="product-badge bg-secondary border-default text-body
                            ">{{__('out of stock')}}</div>
                            @endif

                        @if($item->previous_price && $item->previous_price !=0)
                        <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($item)}}</div>
                        @endif
                        <div class="product-thumb">
                            <a href="{{route('front.product',$item->slug)}}">
                              <img class="lazy" data-src="{{asset('assets/images/'.$item->thumbnail)}}" alt="Product" style="width: 100%!important;">
                            </a>
                                <div class="product-button-group">
                                <a class="product-button wishlist_store" href="{{route('user.wishlist.store',$item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                <a class="product-button product_compare" href="javascript:;" data-target="{{route('fornt.compare.product',$item->id)}}" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                @include('includes.item_footer',['sitem' => $item])
                            </div>
                        </div>
                        <div class="product-card-body">
                            <div class="product-category">
                                <a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a>
                            </div>
                            <h3 class="product-title"><a href="{{route('front.product',$item->slug)}}">
                                {{ strlen(strip_tags($item->name)) > $name_string_count ? substr(strip_tags($item->name), 0, 38) : strip_tags($item->name) }}
                            </a></h3>
                            <div class="rating-stars">
                                {!!renderStarRating($item->reviews->avg('rating'))!!}
                            </div>
                            <h4 class="product-price">
                                @if ($item->previous_price !=0)
                                <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                                @endif
                                {{--{{PriceHelper::grandCurrencyPrice($item)}}--}}
                                @if ($item->previous_price !=0)
                                    <span class="product-priceDiscounted">{{PriceHelper::grandCurrencyPrice($item)}}</span>
                                @else
                                    {{PriceHelper::grandCurrencyPrice($item)}}
                                @endif
                            </h4>


                        </div>

                        </div>
                    </div>
                    @endforeach
                @else
                    @foreach ($items as $item)
                        <div class="col-lg-12">

                            <div class="product-card product-list">
                                <div class="product-thumb" >
                                @if ($item->is_stock())

                                    <div class="product-badge
                                        @if($item->is_type == 'feature')
                                        bg-warning
                                        @elseif($item->is_type == 'new')
                                        bg-danger
                                        @elseif($item->is_type == 'top')
                                        bg-info
                                        @elseif($item->is_type == 'best')
                                        bg-dark
                                        @elseif($item->is_type == 'flash_deal')
                                        bg-success
                                        @endif
                                        ">{{  $item->is_type != 'undefine' ?  ucfirst(str_replace('_',' ',$item->is_type)) : ''   }}
                                    </div>
                                    @else
                                    <div class="product-badge bg-secondary border-default text-body
                                    ">{{__('out of stock')}}</div>
                                    @endif
                                    @if($item->previous_price && $item->previous_price !=0)
                                    <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($item)}}</div>
                                    @endif

                                    <a href="{{route('front.product',$item->slug)}}">
                                      <img class="lazy" data-src="{{asset('assets/images/'.$item->thumbnail)}}" alt="Product">
                                    </a>
                                    <div class="product-button-group">
                                        <a class="product-button wishlist_store" href="{{route('user.wishlist.store',$item->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                        <a data-target="{{route('fornt.compare.product',$item->id)}}" class="product-button product_compare" href="javascript:;" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                        @include('includes.item_footer',['sitem' => $item])
                                    </div>
                                </div>
                                    <div class="product-card-inner">
                                        <div class="product-card-body">
                                            <div class="product-category"><a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a></div>
                                            <h3 class="product-title"><a href="{{route('front.product',$item->slug)}}">
                                                {{ strlen(strip_tags($item->name)) > $name_string_count ? substr(strip_tags($item->name), 0, 52) .'...': strip_tags($item->name) }}
                                            </a></h3>
                                            <div class="rating-stars">
                                                {!! renderStarRating($item->reviews->avg('rating')) !!}
                                            </div>
                                            <h4 class="product-price">
                                                @if ($item->previous_price !=0)
                                                <del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del>
                                                @endif
                                                    @if ($item->previous_price !=0)
                                                        <span class="product-priceDiscounted"> {{PriceHelper::grandCurrencyPrice($item)}}</span>
                                                    @else
                                                        {{PriceHelper::grandCurrencyPrice($item)}}
                                                    @endif
                                            </h4>
                                            <p class="text-sm sort_details_show  text-muted hidden-xs-down my-1">
                                            {{ strlen(strip_tags($item->sort_details)) > 100 ? substr(strip_tags($item->sort_details), 0, 100) : strip_tags($item->sort_details) }}
                                            </p>
                                        </div>


                                    </div>
                                </div>
                        </div>
                    @endforeach
                @endif
            @else
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="h4 mb-0">{{ __('No Product Found') }}</h4>
                        </div>
                    </div>
                </div>
            @endif
        </div>


        <!-- Pagination-->
        <div class="row mt-15" id="item_pagination">
            <div class="col-lg-12 text-center">
                {{$items->links()}}
            </div>
        </div>

        <script type="text/javascript" src="{{asset('assets/front/js/catalog.js')}}"></script>



