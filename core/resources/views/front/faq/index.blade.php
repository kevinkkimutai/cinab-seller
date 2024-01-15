@extends('master.front')
@section('meta')
<meta name="keywords" content="{{$setting->meta_keywords}}">
<meta name="description" content="{{$setting->meta_description}}">
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
                    <li><a href="{{(route('front.index'))}}">{{__('Home')}}</a> </li>
                    <li class="separator">&nbsp;</li>
                    <li>{{__('FAQ')}}</li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container pt-3 pb-3">
    <div class="row pb-4">
        @foreach ($fcategories as $category)
            <div class="col-lg-4 col-md-6">
                <a href="{{route('front.faq.details',$category->slug)}}" class="card mb-4 faq-box">
                    <div class="card-body">
                        <h6 class="card-title">{{$category->name}}</h6>
                        <p class="card-text">{{$category->text}}</p>
                        <span class="text-sm text-muted link">{{ __('View Details') }} <i class="icon-chevron-right"></i></span>
                    </div>
                </a>
            </div>
        @endforeach
    </div>
  </div>
@endsection
