@extends('master.front')
@section('title')
    {{__('Password Reset')}}
@endsection
@section('content')
<!-- Page Title-->
<div class="page-title">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumbs">
                    <li><a href="{{route('front.index')}}">{{__('Home')}}</a> </li>
                    <li class="separator"></li>
                    <li>{{__('Password Reset')}}</li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1">
  <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <form class="card mt-4" method="POST" action="{{route('user.forgot.submit')}}">
                @csrf
              <div class="card-body">
                <div class="form-group">
                <h4 class="d-block text-center mb-4">{{__('Forgot your password?')}}</h4>
                  <label for="email-for-pass">{{__('Enter your email address')}}</label>
                  <input class="form-control" type="text" name="email" id="email-for-pass" placeholder="{{__('Enter your email address')}}">
                  @error('email')
                  <p class="text-danger">{{$message}}</p>
                  @enderror
                  <small class="text-muted">{{__('Type in the email address you used when you registered with our website')}}</small>
                </div>
                <button class="btn btn-primary btn-sm" type="submit"><span>{{__('Get New Password')}}</span></button>
                <a href="{{route('user.login')}}" class="btn btn-primary btn-sm" ><span>{{__('Login')}}</span></a>
              </div>
            </form>
          </div>
        </div>
  </div>
@endsection
