@if ($sitem->item_type != 'affiliate')
    @if ($sitem->is_stock())
    <a class="product-button add_to_single_cart"  data-target="{{ $sitem->id }}" href="javascript:;"  title="{{__('To Cart')}}"><i class="icon-shopping-cart"></i>
    </a>
    @else
    <a class="product-button" href="{{route('front.product',$sitem->slug)}}" title="{{__('Details')}}"><i class="icon-arrow-right"></i></a>
    @endif
@else
<a class="product-button" href="{{$sitem->affiliate_link}}" target="_blank" title="{{__('Buy Now')}}"><i class="icon-arrow-right"></i></a>
@endif