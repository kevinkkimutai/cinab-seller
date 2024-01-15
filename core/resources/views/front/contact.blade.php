@extends('master.front')
@section('meta')
<meta name="keywords" content="{{$setting->meta_keywords}}">
<meta name="description" content="{{$setting->meta_description}}">
@endsection
@section('title')
    {{__('Contact')}}
@endsection

@section('content')
    <!-- Page Title-->
<div class="page-title">
    <div class="container">
      <div class="row">
          <div class="col-lg-12">
            <ul class="breadcrumbs">
                <li><a href="{{route('front.index')}}">{{ __('Home') }}</a> </li>
                <li class="separator"></li>
                <li>{{ __('Contact Us') }}</li>
              </ul>
          </div>
      </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1 contact-page">


    <div class="row">
      <div class="col-lg-4 col-md-5 col-sm-5 order-lg-1 order-md-2 order-sm-2">

        <!-- Widget Contacts-->
        <section class="widget widget-featured-posts card rounded p-4 ">
          <h3 class="widget-title padding-bottom-1x">{{__('Working Days')}}</h3>
          <ul class="list-unstyled text-sm">
            <li><span class="text-muted">{{__('Monday-Friday')}}:</span>{{$setting->friday_start}} - {{$setting->friday_end}}</li>
            <li><span class="text-muted">{{__('Saturday')}}:</span>{{$setting->satureday_start}} - {{$setting->satureday_end}}</li>
          </ul>
          
        </section>
        <!-- Widget Address-->
        <section class="widget widget-featured-posts card rounded p-4">
          <h3 class="widget-title padding-bottom-1x">{{__('Store address')}}</h3>
          <p>{{__('Our address information')}}</p>
          <ul class="list-icon margin-bottom-1x">
            <li> <i class="icon-map-pin text-muted"></i>{{$setting->footer_address}}</li>
            <li> <i class="icon-phone text-muted"></i>{{$setting->footer_phone}}</li>
          </ul>

          @php
          $links = json_decode($setting->social_link,true)['links'];
          $icons = json_decode($setting->social_link,true)['icons'];

          @endphp

          <div>
            @foreach ($links as $link_key => $link)
            <a class="social-button shape-circle sb-facebook" href="{{$link}}" data-toggle="tooltip" data-placement="top"><i class="{{$icons[$link_key]}}"></i></a>
            @endforeach
          </div>
        </section>
      </div>

      <div class="col-lg-8 col-md-7 col-sm-7 order-lg-2 order-md-1 order-sm-1">
        <div class="contact-form-box card">

            <h2 class="h4">{{ __('Tell Us Your Message :') }}</h2>
            <form class="row mt-2" method="Post" action="{{route('front.contact.submit')}}">
                @csrf
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="first-name">{{__('First Name')}}</label>
                    <input class="form-control form-control-rounded" name="first_name" type="text" id="first-name" placeholder="{{__('First Name')}}" >
                    @error('first_name')
                    <p class="text-danger">{{$message}}</p>
                    @enderror
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last-name">{{__('Last Name')}}</label>
                    <input class="form-control form-control-rounded" name="last_name" type="text" id="last-name" placeholder="{{__('Last Name')}}" >
                    @error('last_name')
                    <p class="text-danger">{{$message}}</p>
                    @enderror
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="contact-email">{{__('E-mail')}}</label>
                    <input class="form-control form-control-rounded" type="email" name="email" id="contact-email" placeholder="{{__('E-mail')}}" >
                    @error('email')
                    <p class="text-danger">{{$message}}</p>
                    @enderror
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="contact-tel">{{__('Phone')}}</label>
                    <input class="form-control form-control-rounded" type="text" name="phone" id="contact-tel" placeholder="{{__('Phone')}}" >
                    @error('phone')
                    <p class="text-danger">{{$message}}</p>
                    @enderror
                  </div>
                </div>

                <div class="col-12  ">
                  <div class="form-group">
                    <label for="message-text">{{__('Message')}}</label>
                    <textarea class="form-control form-control-rounded" rows="9" name="message" id="message-text" placeholder="{{__('Write your message here...')}}"></textarea>
                    @error('message')
                    <p class="text-danger">{{$message}}</p>
                    @enderror
                  </div>
                </div>
                @if ($setting->recaptcha == 1)
                <div class="col-lg-12 mb-4">
                    {!! NoCaptcha::renderJs() !!}
                    {!! NoCaptcha::display() !!}
                    @if ($errors->has('g-recaptcha-response'))
                    @php
                        $errmsg = $errors->first('g-recaptcha-response');
                    @endphp
                    <p class="text-danger mb-0">{{__("$errmsg")}}</p>
                    @endif
                </div>
                @endif


                <div class="col-12 text-right">
                    <!-- Show toastr after succesfull submit -->
                  <button class="btn btn-primary" type="submit"><span>{{ __('Send message') }}</span></button>
                </div>
              </form>
        </div>
      </div>
    </div>
  </div>
@endsection
