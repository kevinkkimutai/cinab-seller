@extends('master.front')
@section('meta')
<meta name="keywords" content="{{$category->meta_keywords}}">
<meta name="description" content="{{$category->meta_descriptions}}">
@endsection
@section('title')
    {{__('FAQ')}}
@endsection

@section('content')
    <!-- Page Title-->
<div class="page-title">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumbs">
                    <li><a href="{{route('front.index')}}">{{__('Home')}}</a>
                    </li>
                    <li class="separator">&nbsp;</li>
                    <li><a href="{{route('front.faq')}}">{{__('FAQ')}}</a>
                    </li>
                    <li class="separator">&nbsp;</li>
                    <li>{{$category->name}}</li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-1x mb-3">
      @foreach ($category->faqs as $key => $faq)
      <div class="accordion" id="accordion1">
        <div class="card accordion-item mb-4">
            {{--<div class="card-header accordion-header" id="heading{{$key}}">
              <h6 class="accordion-button">
                  <a href="#collapse{{$key}}" data-bs-toggle="collapse" data-bs-target="#collapse{{$key}}" aria-expanded="false" aria-controls="collapse{{$key}}">{{$faq->title}}</a>
                </h6>

            </div>--}}
            <div class="card-body">{{$faq->details}}</div>
            {{--<div id="collapse{{$key}}" class="accordion-collapse collapse"  aria-labelledby="heading{{$key}}" data-bs-parent="#accordion1">
              <div class="card-body">{{$faq->details}}</div>
            </div>--}}
          </div>
        </div>
        @endforeach
  </div>

@endsection
