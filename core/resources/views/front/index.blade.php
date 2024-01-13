@section('hometitle')
    {{ $setting->home_page_title }}
@endsection
@if ($setting->theme == 'theme1')
    @includeIf('front.themes.theme1')

@elseif($setting->theme == 'theme2')
    @includeIf('front.themes.theme2')

@elseif($setting->theme == 'theme3')
    @includeIf('front.themes.theme3')

@elseif($setting->theme == 'theme4')
    @includeIf('front.themes.theme4')

@endif