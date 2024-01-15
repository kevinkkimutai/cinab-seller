@extends('master.front')
@section('meta')
<meta name="keywords" content="{{$setting->meta_keywords}}">
<meta name="description" content="{{$setting->meta_description}}">
@endsection
@section('title')
    {{__('Brand')}}
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
                    <li>{{__('Brand')}}</li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container pt-0 pb-5">
    <div class="row g-3">
        @foreach ($brands as $brand)
            <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-6">
                <a class="b-p-s-b" href="{{ route('front.catalog') . '?brand=' . $brand->slug }}">
                    <img class="d-block hi-50"
                        src="{{ asset('assets/images/' . $brand->photo) }}"
                        alt="{{ $brand->name }}" title="{{ $brand->name }}">
                </a>
            </div>
        @endforeach
    </div>
  </div>
@endsection
