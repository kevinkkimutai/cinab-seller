
   @php
        $categories = App\Models\Category::with('subcategory')->whereStatus(1)->orderby('serial','asc')->take(8)->get();
    @endphp


    <div class="left-category-area">
        <div class="category-header">
            <h4><i class="icon-align-justify"></i> {{ __('Categories') }}</h4>
        </div>
        <div class="category-list">
            @foreach ($categories as $key => $pcategory)
                <div class="c-item">
                    <a class="d-block navi-link" href="{{route('front.catalog').'?category='.$pcategory->slug}}">
                        <img class="lazy" data-src="{{asset('assets/images/'.$pcategory->photo)}}">
                        <span class="text-gray-dark">{{$pcategory->name}}</span>
                        @if ($pcategory->subcategory->count() > 0)
                        <i class="icon-chevron-right"></i>
                        @endif
                    </a>
                    @if ($pcategory->subcategory->count() > 0)
                    <div class="sub-c-box">
                            @foreach ($pcategory->subcategory as $scategory)
                            <div class="child-c-box">
                              <a class="title" href="{{route('front.catalog').'?subcategory='.$scategory->slug}}">
                                {{$scategory->name}}
                                @if ($scategory->childcategory->count() > 0)
                                <i class="icon-chevron-right"></i>
                                @endif
                                </a>
                                @if ($scategory->childcategory->count() > 0)
                              <div class="child-category">

                                @foreach ($scategory->childcategory as $childcategory)
                                <a href="{{route('front.catalog').'?childcategory='.$childcategory->slug}}">{{$childcategory->name}}</a>
                                @endforeach
                              </div>
                              @endif
                            </div>
                            @endforeach
                    </div>
                    @endif
                </div>
            @endforeach
        <a href="{{route('front.catalog')}}" class="d-block navi-link view-all-category">
            <img class="lazy" data-src="{{ asset('assets/images/category.jpg') }}" alt="">
            <span class="text-gray-dark">{{ __('All Categories')}}</span>
        </a>
    </div>


    </div>


