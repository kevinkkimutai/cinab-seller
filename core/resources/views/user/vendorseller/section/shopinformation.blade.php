@extends('master.front')
@section('title')
    {{__('Dashboard')}}
@endsection
@section('content')

    <!-- Page Title-->
    <div class="page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="breadcrumbs">
                        <li><a href="{{ route('front.index')}}">{{__('Home')}}</a> </li>
                        <li class="separator"></li>
                        <li>{{__('Welcome Back')}}, {{$user->first_name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Content-->
    <div class="container padding-bottom-3x mb-1">
        <div class="row">
            @include('includes.user_sitebar')
            <div class="col-lg-9">
                @include("user.vendorseller.section.sellerTopsection")
                <div class="card">
                    <div class="card-body">
                        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                        <div class="mb-3">
                            <h6 class="mb-0">Shop Information</h6>
                            <span class="mt-0">Setup your shop by completing the following details</span>
                        </div>
                        <form  class="row" action="{{route('user.profile.update')}}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Business Type')}}</label>
                                    <select class="form-control" name="businessType">
                                        <option value="">Business</option>
                                        <option value="">Individual</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Shop Name')}}</label>
                                    <input class="form-control" name="shopname" type="text" id="shopname" value="">
                                    @error('first_name')
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="checkout-country">{{ __('Country') }}</label>
                                    <select class="form-control" required name="Country" id="Country">
                                        <option selected>{{__('Choose Country')}}</option>
                                        @foreach (DB::table('countries')->get() as $country)
                                            <option value="{{$country->name}}" {{isset($user) && $user->bill_country == $country->name ? 'selected' :''}} >{{$country->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Shop Zone')}}</label>
                                    <select class="form-control" name="shopzone">
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Mombasa">Mombasa</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <hr class="mt-2 mb-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <a href="{{route('user.businessinfo')}}" class="btn btn-primary margin-right-none" type="submit"><span>{{__('Submit')}}</span></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
