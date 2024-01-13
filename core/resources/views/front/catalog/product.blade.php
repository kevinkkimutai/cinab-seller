@extends('master.front')

@section('title')
 {{ $item->name}}
@endsection

@section('meta')
<meta name="keywords" content="{{$item->meta_keywords}}">
<meta name="description" content="{{$item->meta_description}}">
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
                <li><a href="{{route('front.catalog')}}">{{__('Shop')}}</a>
                </li>
                <li class="separator"></li>
                <li>{{$item->name}}</li>
              </ul>
          </div>
      </div>
    </div>
</div>
  <!-- Page Content-->
<div class="container padding-bottom-1x mb-1">
    <div class="row">
      <!-- Poduct Gallery-->
      <div class="col-xxl-5 col-lg-6 col-md-6">
        <div class="product-gallery">
            @if ($item->video)
            <div class="gallery-wrapper">
                <div class="gallery-item video-btn text-center">
                    <a href="{{ $item->video }}" title="Watch video"></a>
                </div>
            </div>
          @endif
          @if($item->is_stock())
          <span class="product-badge
          @if($item->is_type == 'feature')
          bg-warning
          @elseif($item->is_type == 'new')
          bg-success
          @elseif($item->is_type == 'top')
          bg-info
          @elseif($item->is_type == 'best')
          bg-dark
          @elseif($item->is_type == 'flash_deal')
            bg-success
          @endif
          ">{{  $item->is_type != 'undefine' ?  ucfirst(str_replace('_',' ',$item->is_type)) : ''   }}</span>

          @else
          <span class="product-badge bg-secondary border-default text-body
          ">{{__('out of stock')}}</span>
          @endif

          @if($item->previous_price && $item->previous_price !=0)
          <div class="product-badge bg-goldenrod  ppp-t"> -{{PriceHelper::DiscountPercentage($item)}}</div>
          @endif

          <div class="product-thumbnails insize">
            <div class="product-details-slider owl-carousel" >
            <div class="item"><img src="{{asset('assets/images/'.$item->photo)}}" alt="zoom"  /></div>
            @foreach ($galleries as $key => $gallery)
            <div class="item"><img src="{{asset('assets/images/'.$gallery->photo)}}" alt="zoom"  /></div>
            @endforeach
        </div>
      </div>
        </div>
      </div>

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
        <!-- Product Info-->
        <div class="col-xxl-7 col-lg-6 col-md-6">
            <div class="details-page-top-right-content d-flex align-items-center">
                <div class="div w-100">
                    <input type="hidden" id="item_id" value="{{$item->id}}">
                    <input type="hidden" id="demo_price" value="{{PriceHelper::setConvertPrice($item->discount_price)}}">
                    <input type="hidden" value="{{PriceHelper::setCurrencySign()}}" id="set_currency">
                    <input type="hidden" value="{{PriceHelper::setCurrencyValue()}}" id="set_currency_val">
                    <input type="hidden" value="{{$setting->currency_direction}}" id="currency_direction">
                    <h4 class="mb-2 p-title-main">{{$item->name}}</h4>
                    <div class="mb-3">
                        <div class="rating-stars d-inline-block gmr-3">
                        {!!renderStarRating($item->reviews->avg('rating'))!!}
                        </div>
                        @if ($item->is_stock())
                            <span class="text-success  d-inline-block">{{__('In Stock')}}</span>
                        @else
                            <span class="text-danger  d-inline-block">{{__('Out of stock')}}</span>
                        @endif
                    </div>


                    @if($item->is_type == 'flash_deal')
                    @if (date('d-m-y') != \Carbon\Carbon::parse($item->date)->format('d-m-y'))
                    <div class="countdown countdown-alt mb-3" data-date-time="{{ $item->date }}">
                    </div>
                    @endif
                    @endif

                    <span class="h3 d-block price-area">
                    @if ($item->previous_price != 0)
                        <small class="d-inline-block"><del>{{PriceHelper::setPreviousPrice($item->previous_price)}}</del></small>
                    @endif
                    <span id="main_price" class="main-price">{{PriceHelper::grandCurrencyPrice($item)}}</span>
                    </span>

                    <p class="text-muted">{{$item->sort_details}} <a href="#details" class="scroll-to">{{__('Read more')}}</a></p>

                    <div class="row margin-top-1x">
                        @foreach($attributes as $attribute)
                        @if($attribute->options->count() != 0)
                            <div class="col-sm-6">
                                <div class="form-group">
                                <label for="{{ $attribute->name }}">{{ $attribute->name }}</label>
                                <select class="form-control attribute_option" id="{{ $attribute->name }}">
                                    @foreach($attribute->options->where('stock','!=','0') as $option)
                                    <option value="{{ $option->name }}" data-type="{{$attribute->id}}" data-href="{{$option->id}}" data-target="{{PriceHelper::setConvertPrice($option->price)}}">{{ $option->name }}</option>
                                    @endforeach
                                  </select>
                                </div>
                            </div>
                            @endif
                        @endforeach
                        lazy
                    </div>
                    <div class="row align-items-end pb-4">
                        <div class="col-sm-12">
                            @if ($item->item_type == 'normal')
                            <div class="qtySelector product-quantity">
                              <span class="decreaseQty subclick"><i class="fas fa-minus "></i></span>
                              <input type="text" class="qtyValue cart-amount" value="1">
                              <span class="increaseQty addclick"><i class="fas fa-plus"></i></span>
                                <input type="hidden" value="3333" id="current_stock">
                            </div>
                            @endif
                            <div class="p-action-button">
                              @if ($item->item_type != 'affiliate')
                                @if ($item->is_stock())
                                <button class="btn btn-primary m-0 a-t-c-mr" id="add_to_cart"><i class="icon-bag"></i><span>{{ __('Add to Cart') }}</span></button>
                                <button class="btn btn-primary m-0" id="but_to_cart"><i class="icon-bag"></i><span>{{ __('Buy Now') }}</span></button>
                                @else
                                    <button class="btn btn-primary m-0"><i class="icon-bag"></i><span>{{__('Out of stock')}}</span></button>
                                @endif
                              @else
                              <a href="{{$item->affiliate_link}}" target="_blank" class="btn btn-primary m-0"><span><i class="icon-bag"></i>{{ __('Buy Now') }}</span></a>
                              @endif

                            </div>

                        </div>
                    </div>

                    <div class="div">
                        <div class="t-c-b-area">
                            @if ($item->brand_id)
                            <div class="pt-1 mb-1"><span class="text-medium">{{__('Brand')}}:</span>
                                    <a href="{{route('front.catalog').'?brand='.$item->brand->slug}}">{{$item->brand->name}}</a>
                                </div>
                            @endif

                                <div class="pt-1 mb-1"><span class="text-medium">{{__('Categories')}}:</span>
                                    <a href="{{route('front.catalog').'?category='.$item->category->slug}}">{{$item->category->name}}</a>
                                        @if ($item->subcategory->name)
                                        /
                                        @endif
                                    <a href="{{route('front.catalog').'?subcategory='.$item->subcategory->slug}}">{{$item->subcategory->name}}</a>
                                        @if ($item->childcategory->name)
                                        /
                                        @endif
                                    <a href="{{route('front.catalog').'?childcategory='.$item->childcategory->slug}}">{{$item->childcategory->name}}</a>
                                </div>
                                <div class="pt-1 mb-1"><span class="text-medium">{{__('Tags')}}:</span>
                                    @if($item->tags)
                                    @foreach (explode(',',$item->tags) as $tag)
                                    @if ($loop->last)
                                    <a href="{{route('front.catalog').'?tag='.$tag}}">{{$tag}}</a>
                                    @else
                                    <a href="{{route('front.catalog').'?tag='.$tag}}">{{$tag}}</a>,
                                    @endif
                                    @endforeach
                                    @endif
                                </div>
                                @if ($item->item_type == 'normal')
                                <div class="pt-1 mb-4"><span class="text-medium">{{__('SKU')}}:</span> #{{$item->sku}}</div>
                                @endif
                        </div>

                        <div class="mt-4 p-d-f-area">
                            <div class="left">
                                <a class="btn btn-primary btn-sm wishlist_store wishlist_text" href="{{route('user.wishlist.store',$item->id)}}"><span><i class="icon-heart"></i></span>
                                @if (Auth::check() && App\Models\Wishlist::where('user_id',Auth::user()->id)->where('item_id',$item->id)->exists())
                                <span>{{__('Added To Wishlist')}}</span>
                                @else
                                <span class="wishlist1">{{__('Wishlist')}}</span>
                                <span class="wishlist2 d-none">{{__('Added To Wishlist')}}</span>
                                @endif
                                </a>
                                <button class="btn btn-primary btn-sm  product_compare" data-target="{{route('fornt.compare.product',$item->id)}}" ><span><i class="icon-repeat"></i>{{__('Compare')}}</span></button>
                            </div>

                            <div class="d-flex align-items-center">
                                <span class="text-muted mr-1">{{__('Share')}}: </span>
                                <div class="d-inline-block a2a_kit">
                                    <a class="facebook  a2a_button_facebook" href="">
                                        <span><i class="fab fa-facebook-f"></i></span>
                                    </a>
                                    <a class="twitter  a2a_button_twitter" href="">
                                        <span><i class="fab fa-twitter"></i></span>
                                    </a>
                                    <a class="linkedin  a2a_button_linkedin" href="">
                                        <span><i class="fab fa-linkedin-in"></i></span>
                                    </a>
                                    <a class="pinterest   a2a_button_pinterest" href="">
                                        <span><i class="fab fa-pinterest"></i></span>
                                    </a>
                                </div>
                                <script async src="https://static.addtoany.com/menu/page.js"></script>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" padding-top-3x mb-3" id="details">
            <div class="col-lg-12">
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">{{__('Descriptions')}}</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" type="button" role="tab" aria-controls="specification" aria-selected="false">{{__('Specifications')}}</a>
                </li>
            </ul>
            <div class="tab-content card">
                <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab"">
                {!! $item->details !!}
                </div>
                <div class="tab-pane fade show" id="specification" role="tabpanel" aria-labelledby="specification-tab">
                <div class="comparison-table">
                    <table class="table table-bordered">
                        <thead class="bg-secondary">
                        </thead>
                        <tbody>
                        <tr class="bg-secondary">
                            <th class="text-uppercase">{{__('Specifications')}}</th>
                            <td><span class="text-medium">{{__('Descriptions')}}</span></td>
                        </tr>
                        @if($sec_name)
                        @foreach(array_combine($sec_name,$sec_details) as  $sname => $sdetail)
                        <tr>
                            <th>{{$sname}}</th>
                            <td>{{$sdetail}}</td>
                        </tr>
                        @endforeach
                        @else
                        <tr class="text-center">
                            <td colspan="2">{{__('No Specifications')}}</td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>


  <!-- Reviews-->
  <div class="container  review-area">
    <div class="row">
        <div class="col-lg-12">
            <div class="section-title">
                <h2 class="h3">{{ __('Latest Reviews') }}</h2>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
              @forelse ($reviews as $review)
              <div class="single-review">
                  <div class="comment">
                    <div class="comment-author-ava"><img class="lazy" data-src="{{asset('assets/images/'.$review->user->photo)}}" alt="Comment author"></div>
                    <div class="comment-body">
                      <div class="comment-header d-flex flex-wrap justify-content-between">
                        <div>
                            <h4 class="comment-title mb-1">{{$review->subject}}</h4>
                            <span>{{$review->user->first_name}}</span>
                            <span class="ml-3">{{$review->created_at->format('M d, Y')}}</span>
                        </div>
                        <div class="mb-2">
                          <div class="rating-stars">
                            @php
                                for($i=0; $i<$review->rating;$i++){
                                 echo "<i class = 'far fa-star filled'></i>";
                                }
                            @endphp
                          </div>
                        </div>
                      </div>
                      <p class="comment-text  mt-2">{{$review->review}}</p>

                    </div>
                  </div>
              </div>
              @empty
              <div class="card p-5">
                {{__('No Review')}}
              </div>
              @endforelse
              <div class="row mt-15">
                <div class="col-lg-12 text-center">
                    {{$reviews->links()}}
                </div>
            </div>

          </div>
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="text-center">
                  <div class="d-inline align-baseline display-3 mr-1">{{ round($item->reviews->avg('rating'),2)}}</div>
                  <div class="d-inline align-baseline text-sm text-warning mr-1">
                    <div class="rating-stars">{!!renderStarRating($item->reviews->avg('rating'))!!}</div>
                  </div>
                </div>
                <div class="pt-3">
                  <label class="text-medium text-sm">5 {{__('stars')}} <span class="text-muted">- {{$item->reviews->where('status',1)->where('rating',5)->count()}}</span></label>
                  <div class="progress margin-bottom-1x">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: {{$item->reviews->where('status',1)->where('rating',5)->sum('rating') * 20}}%; height: 2px;" aria-valuenow="100" aria-valuemin="{{$item->reviews->where('rating',5)->sum('rating') * 20}}" aria-valuemax="100"></div>
                  </div>
                  <label class="text-medium text-sm">4 {{__('stars')}} <span class="text-muted">- {{$item->reviews->where('status',1)->where('rating',4)->count()}}</span></label>
                  <div class="progress margin-bottom-1x">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: {{$item->reviews->where('status',1)->where('rating',4)->sum('rating') * 20}}%; height: 2px;" aria-valuenow="{{$item->reviews->where('rating',4)->sum('rating') * 20}}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <label class="text-medium text-sm">3 {{__('stars')}} <span class="text-muted">- {{$item->reviews->where('status',1)->where('rating',3)->count()}}</span></label>
                  <div class="progress margin-bottom-1x">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: {{$item->reviews->where('rating',3)->sum('rating') * 20}}%; height: 2px;" aria-valuenow="{{$item->reviews->where('rating',3)->sum('rating') * 20}}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <label class="text-medium text-sm">2 {{__('stars')}} <span class="text-muted">- {{$item->reviews->where('status',1)->where('rating',2)->count()}}</span></label>
                  <div class="progress margin-bottom-1x">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: {{$item->reviews->where('status',1)->where('rating',2)->sum('rating') * 20}}%; height: 2px;" aria-valuenow="{{$item->reviews->where('rating',2)->sum('rating') * 20}}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <label class="text-medium text-sm">1 {{__('star')}} <span class="text-muted">- {{$item->reviews->where('status',1)->where('rating',1)->count()}}</span></label>
                  <div class="progress mb-2">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: {{$item->reviews->where('status',1)->where('rating',1)->sum('rating') * 20}}; height: 2px;" aria-valuenow="0" aria-valuemin="{{$item->reviews->where('rating',1)->sum('rating') * 20}}" aria-valuemax="100"></div>
                  </div>
                </div>
                @if (Auth::user())
                    <div class="pb-2"><a class="btn btn-primary btn-block" href="#" data-bs-toggle="modal" data-bs-target="#leaveReview"><span>{{__('Leave a Review')}}</span></a></div>
                    @else
                    <div class="pb-2"><a class="btn btn-primary btn-block" href="{{route('user.login')}}" ><span>{{__('Login')}}</span></a></div>
                @endif
              </div>
            </div>
          </div>


    </div>
  </div>

  @if(count($related_items)>0)
  <div class="relatedproduct-section container padding-bottom-3x mb-1 s-pt-30">
    <!-- Related Products Carousel-->
    <div class="row">
        <div class="col-lg-12">
            <div class="section-title">
                <h2 class="h3">{{ __('You May Also Like') }}</h2>
            </div>
        </div>
    </div>
    <!-- Carousel-->
    <div class="row">
        <div class="col-lg-12">
            <div class="relatedproductslider owl-carousel" >
                @foreach ($related_items as $related)
                    <div class="slider-item">
                        <div class="product-card">

                            @if ($related->is_stock())
                                @if($related->is_type == 'new')
                                @else
                                    <div class="product-badge
                                    @if($related->is_type == 'feature')
                                    bg-warning

                                    @elseif($related->is_type == 'top')
                                    bg-info
                                    @elseif($related->is_type == 'best')
                                    bg-dark
                                    @elseif($related->is_type == 'flash_deal')
                                    bg-success
                                    @endif
                                    ">{{  $related->is_type != 'undefine' ?  ucfirst(str_replace('_',' ',$related->is_type)) : ''   }}</div>
                                    @endif
                                    @else
                                    <div class="product-badge bg-secondary border-default text-body
                                    ">{{__('out of stock')}}</div>
                            @endif
                                    @if($related->previous_price && $related->previous_price !=0)
                                    <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($related)}}</div>
                            @endif

                            @if($related->previous_price && $related->previous_price !=0)
                            <div class="product-badge product-badge2 bg-info"> -{{PriceHelper::DiscountPercentage($related)}}</div>
                            @endif
                            <div class="product-thumb">
                                <a href="{{route('front.product',$related->slug)}}">
                                   <img class="lazy" data-src="{{asset('assets/images/'.$related->thumbnail)}}" alt="Product" style="width: 100%!important;">
                                </a>
                                <div class="product-button-group">
                                    <a class="product-button wishlist_store" href="{{route('user.wishlist.store',$related->id)}}" title="{{__('Wishlist')}}"><i class="icon-heart"></i></a>
                                    <a class="product-button product_compare" href="javascript:;" data-target="{{route('fornt.compare.product',$related->id)}}" title="{{__('Compare')}}"><i class="icon-repeat"></i></a>
                                    @include('includes.item_footer',['sitem' => $related])
                                    </div>
                                </div>
                            <div class="product-card-body">
                              <div class="product-category"><a href="{{route('front.catalog').'?category='.$related->category->slug}}">{{$related->category->name}}</a></div>
                              <h3 class="product-title"><a href="{{route('front.product',$related->slug)}}">
                                {{ strlen(strip_tags($related->name)) > 35 ? substr(strip_tags($related->name), 0, 35) : strip_tags($related->name) }}
                            </a></h3>
                              <h4 class="product-price">
                                @if ($related->previous_price !=0)
                                    <del>{{PriceHelper::setPreviousPrice($related->previous_price)}}</del>
                                @endif
                                {{--{{PriceHelper::grandCurrencyPrice($related)}} --}}
                                 @if ($item->previous_price !=0)
                                  <span class="product-priceDiscounted" >{{PriceHelper::grandCurrencyPrice($related)}}</span>
                                @else
                                    {{PriceHelper::grandCurrencyPrice($related)}}
                                @endif
                              </h4>
                            </div>

                          </div>
                    </div>
                @endforeach
              </div>
        </div>
    </div>
  </div>
  @endif




@auth
<form class="modal fade ratingForm" action="{{route('front.review.submit')}}" method="post" id="leaveReview" tabindex="-1">
  @csrf
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">{{__('Leave a Review')}}</h4>
        <button class="close modal_close" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        @php
            $user = Auth::user();
        @endphp
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="review-name">{{__('Your Name')}}</label>
              <input class="form-control" type="text" id="review-name" value="{{$user->first_name}}" required>
            </div>
          </div>
          <input type="hidden" name="item_id" value="{{$item->id}}">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="review-email">{{__('Your Email')}}</label>
              <input class="form-control" type="email" id="review-email" value="{{$user->email}}" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="review-subject">{{__('Subject')}}</label>
              <input class="form-control" type="text" name="subject" id="review-subject" required>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="review-rating">{{__('Rating')}}</label>
              <select name="rating" class="form-control" id="review-rating">
                <option value="5">5 {{__('Stars')}}</option>
                <option value="4">4 {{__('Stars')}}</option>
                <option value="3">3 {{__('Stars')}}</option>
                <option value="2">2 {{__('Stars')}}</option>
                <option value="1">1 {{__('Star')}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="review-message">{{__('Review')}}</label>
          <textarea class="form-control" name="review" id="review-message" rows="8" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" type="submit"><span>{{__('Submit Review')}}</span></button>
      </div>
    </div>
  </div>
</form>
@endauth

@endsection
