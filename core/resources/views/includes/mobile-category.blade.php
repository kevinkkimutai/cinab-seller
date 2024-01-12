
@php
    $categories = App\Models\Category::with('subcategory')->whereStatus(1)->orderby('serial','asc')->take(8)->get();
@endphp


<div class="widget-categories mobile-cat">
    <ul id="category_list">
        @foreach ($categories as $getcategory)
        <li class="has-children">
            <a class="category_search" href="{{route('front.catalog').'?category='.$getcategory->slug}}">{{$getcategory->name}}
                @if ($getcategory->subcategory->count() > 0)
                    <span><i class="icon-chevron-down"></i></span>
                @endif
            </a>
            <ul id="subcategory_list">
                @foreach ($getcategory->subcategory as $getsubcategory)
                <li class="">
                    <a class="subcategory" href="{{route('front.catalog').'?subcategory='.$getsubcategory->slug}}">{{$getsubcategory->name}}</a>
                    <ul id="childcategory_list">
                        @foreach ($getsubcategory->childcategory as $getchildcategory)
                        <li class="">
                            <a class="childcategory" href="{{route('front.catalog').'?childcategory='.$getchildcategory->slug}}">{{$getchildcategory->name}}</a>
                        </li>
                        @endforeach
                    </ul>
                </li>
                @endforeach
            </ul>
          </li>
        @endforeach
    </ul>
  </div>







