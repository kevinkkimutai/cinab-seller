@if ($setting->is_blog == 1)
    <a class="{{ request()->routeIs('front.blog*') ? 'active' : ''}} nav-link" href="{{route('front.blog')}}">{{__('Baby')}}</a>
@endif

@if ($setting->is_blog == 1)
    <li class="{{ request()->routeIs('front.blog*') ? 'active' : '' }}"><a href="{{route('front.blog')}}">{{__('Construction')}}</a></li>
@endif

@if ($setting->is_blog == 1)
    <li class="{{ request()->routeIs('front.blog*') ? 'active' : '' }}"><a href="{{route('front.blog')}}">{{__('School')}}</a></li>
@endif
@if ($setting->is_blog == 1)
    <li class="{{ request()->routeIs('front.blog*') ? 'active' : '' }}"><a href="{{route('front.blog')}}">{{__('Transport')}}</a></li>
@endif

<li class="t-h-dropdown">
    <a class="main-link" href="#">{{__('Farm')}} <i class="icon-chevron-down"></i></a>
    <div class="t-h-dropdown-menu">
        @if ($setting->is_faq == 1)
            <a class="{{ request()->routeIs('front.faq*') ? 'active' : '' }}" href="{{route('front.faq')}}"><i class="icon-chevron-right pr-2"></i>{{__('Farm')}}</a>
        @endif
        @foreach (DB::table('pages')->wherePos(0)->orwhere('pos',2)->get() as $page)
            <a class="{{request()->url() == route('front.page',$page->slug) ? 'active' : ''}} " href="{{route('front.page',$page->slug)}}"><i class="icon-chevron-right pr-2"></i>{{$page->title}}</a>
        @endforeach
    </div>
</li>