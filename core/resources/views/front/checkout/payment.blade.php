@extends('master.front')
@section('title')
    {{__('Payment')}}
@endsection
@section('content')
    <!-- Page Title-->
<div class="page-title">
    <div class="container">
      <div class="column">
        <ul class="breadcrumbs">
          <li><a href="{{route('front.index')}}">{{ __('Home') }}</a> </li>
          <li class="separator"></li>
          <li>{{ __('Review your order and pay') }}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1  checkut-page">
    <div class="row">
      <!-- Payment Methode-->
      <div class="col-xl-9 col-lg-8">
        <div class="steps flex-sm-nowrap mb-5"> <a class="step" href="{{route('front.checkout.billing')}}">
          <h4 class="step-title"><i class="icon-check-circle"></i>1. {{__('Invoice to')}}:</h4>
          </a> <a class="step" href="{{route('front.checkout.shipping')}}">
          <h4 class="step-title"><i class="icon-check-circle"></i>2. {{__('Ship to')}}:</h4>
          </a> <a class="step active" href="{{route('front.checkout.payment')}}">
          <h4 class="step-title">3. {{__('Review and pay')}}</h4>
          </a>
        </div>
        <div class="card">
            <div class="card-body">
                <h6 class="pb-2">{{__('Review Your Order')}} :</h6>
        <hr>
        <div class="row padding-top-1x  mb-4">
          <div class="col-sm-6">
            <h6>{{__('Invoice address')}} :</h6>
            @php

                $ship = Session::get('shipping_address');
                $bill = Session::get('billing_address');
            @endphp
            <ul class="list-unstyled">
              <li><span class="text-muted">{{__('Name')}}: </span>{{$ship['ship_first_name']}} {{$ship['ship_last_name']}}</li>
              @if (PriceHelper::CheckDigital())
              <li><span class="text-muted">{{__('Address')}}: </span>{{$ship['ship_address1']}} {{$ship['ship_address2']}}</li>
              @endif
              <li><span class="text-muted">{{__('Phone')}}: </span>{{$ship['ship_phone']}}</li>
            </ul>
          </div>
          <div class="col-sm-6">
            <h6>{{__('Shipping address')}} :</h6>
            <ul class="list-unstyled">
              <li><span class="text-muted">{{__('Name')}}: </span>{{$bill['bill_first_name']}} {{$bill['bill_last_name']}}</li>
              @if (PriceHelper::CheckDigital())
              <li><span class="text-muted">{{__('Address')}}: </span>{{$ship['ship_address1']}} {{$ship['ship_address2']}}</li>
              @endif
              <li><span class="text-muted">{{__('Phone')}}: </span>{{$bill['bill_phone']}}</li>
            </ul>

            @if (DB::table('states')->whereStatus(1)->count() > 0)
            <select name="state_id" class="form-control" id="state_id_select" required>
              <option value="" selected disabled>{{__('Select Shipping State')}}</option>
              @foreach (DB::table('states')->whereStatus(1)->get() as $state)
                  <option value="{{$state->id}}" data-href="{{route('front.state.setup',$state->id)}}" {{Auth::check() && Auth::user()->state_id == $state->id ? 'selected' : ''}} >{{$state->name}}
                      @if ($state->type == 'fixed')
                      ({{PriceHelper::setCurrencyPrice($state->price)}})
                      @else
                      ({{$state->price}}%)
                      @endif

                    </option>
              @endforeach
            </select>
            <small class="text-primary">{{__('please select shipping state')}}</small>
            @error('state_id')
                <p class="text-danger">{{$message}}</p>
            @enderror
            @endif


          </div>


        </div>

        <h6>{{__('Pay with')}} :</h6>
        <div class="row mt-4">
          <div class="col-12">
            <div class="payment-methods">
              @php
                  $gateways = DB::table('payment_settings')->whereStatus(1)->get();
              @endphp
              @foreach ($gateways as $gateway)
              @if (PriceHelper::CheckDigitalPaymentGateway())
              @if ($gateway->unique_keyword != 'cod')
              <div class="single-payment-method">
                <a class="text-decoration-none " href="#" data-bs-toggle="modal" data-bs-target="#{{$gateway->unique_keyword}}">
                    <img class="" src="{{asset('assets/images/'.$gateway->photo)}}" alt="{{$gateway->name}}" title="{{$gateway->name}}">
                    <p>{{$gateway->name}}</p>
                </a>
              </div>
              @endif

              @else
              <div class="single-payment-method">
                <a class="text-decoration-none" href="#" data-bs-toggle="modal" data-bs-target="#{{$gateway->unique_keyword}}">
                    <img class="" src="{{asset('assets/images/'.$gateway->photo)}}" alt="{{$gateway->name}}" title="{{$gateway->name}}">
                    <p>{{$gateway->name}}</p>
                </a>
              </div>
              @endif

              @endforeach

            </div>
          </div>
        </div>

        </div>
        </div>

        @include('includes.checkout_modal')

      </div>
      @include('includes.checkout_sitebar',$cart)
    </div>
  </div>
@endsection

