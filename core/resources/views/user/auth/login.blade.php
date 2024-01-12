@extends('master.front')
@section('title')
    {{__('Login')}}
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
                <li>{{__('Login/Register')}}</li>
              </ul>
          </div>
      </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1">
  <div class="row">
         
          <section class="border-none text-center text-lg-start">

            <div class="card mb-3">
              
              <div class="row g-0 d-flex align-items-center">
                <div class="col-lg-5 d-none d-lg-flex">
                  <img src="{{ asset('assets/pics/cinab.jpg')}}" alt="Trendy Pants and Shoes"
                    class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" style="height: 500px!important;" />
                </div>
                <div class="col-lg-7 border shadow-lg rounded">
                  <ul class="nav nav-pills  row border-bottom p-1" id="pills-tab" role="tablist">
                    <li class="nav-item col" role="presentation">
                      <button class="nav-link active w-100 border text-bold" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Login</button>
                    </li>
                    <li class="nav-item col borde" role="presentation">
                      <button class="nav-link  w-100 border text-bold" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Register</button>

                    </li>
                  </ul>
                
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      <div class="card-body ">
                        <h1 class="text-bold text-center">Register</h1>
                
                        <form class="text-start" action="{{route('user.register.submit')}}" method="POST">
                            @csrf
                        <div class="row row-cols-1 row-cols-md-2">
                              <!-- fistname input -->
                          <div class="col mb-2">
                            <label for="reg-fn" class="form-label">FirstName</label>
                            <input class="form-control form-control-sm" type="text" name="first_name" placeholder="{{__('First Name')}}" id="reg-fn" value="{{old('first_name')}}">
                            @error('first_name')
                            <p class="text-danger">{{$message}}</p>
                            @endif
                          </div>
                
                          <!-- lastname input -->
                          <div class="col form-outline mb-4">
                            <label for="reg-ln" class="form-label">LastName</label>
                            <input class="form-control form-control-sm" type="text" name="last_name" placeholder="{{__('Last Name')}}" id="reg-ln" value="{{old('last_name')}}">
                              @error('last_name')
                            <p class="text-danger">{{$message}}</p>
                            @endif
                          </div>
                        </div>
                
                        <div class="row row-cols-1 row-cols-md-2">
                            <!-- Email input -->
                        <div class="col mb-2">
                          <label for="reg-email" class="form-label">Email</label>
                          <input class="form-control form-control-sm" type="email" name="email" placeholder="{{__('E-mail Address')}}" id="reg-email" value="{{old('email')}}">
                              @error('email')
                              <p class="text-danger">{{$message}}</p>
                              @endif
                        </div>
                
                        <!-- Phone input -->
                        <div class="col form-outline mb-4">
                          <label for="reg-phone" class="form-label">Phone Number</label>
                          <input class="form-control form-control-sm" name="phone" type="text" placeholder="{{__('Phone Number')}}" id="reg-phone" value="{{old('phone')}}">
                              @error('phone')
                              <p class="text-danger">{{$message}}</p>
                              @endif
                        </div>
                      </div>
                
                      <div class="row row-cols-1 row-cols-md-2">
                        <!-- Email input -->
                    <div class="col mb-2">
                      <label for="reg-pass" class="form-label">Password</label>
                      <input class="form-control form-control-sm" type="password" name="password" placeholder="{{__('Password')}}" id="reg-pass">
                              @error('password')
                              <p class="text-danger">{{$message}}</p>
                              @endif
                    </div>
                
                    <!-- Password input -->
                    <div class="col form-outline mb-4">
                      <label for="reg-pass-confirm" class="form-label">Confirm Password</label>
                      <input class="form-control form-control-sm" type="password" name="password_confirmation" placeholder="{{__('Confirm Password')}}" id="reg-pass-confirm">
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
                  </div>
                
                          <!-- 2 column grid layout for inline styling -->
                          <div class="row mb-4">
                            <div class="col">
                              <!-- Simple link -->
                              <label href="#!">Already have an account? <a href="{{route('user.login')}}">Login</a></label>
                            </div>
                          </div>
                
                          <!-- Submit button -->
                          <button type="submit" class="btn btn-primary btn-block mb-4"><span>{{__('Register')}}</span></button>
                
                        </form>
                
                      </div>
                    </div>

                    <div class="tab-pane fade show active align-items-center" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <div class=" ">
                        <form class="" method="post" action="{{route('user.login.submit')}}">
                            @csrf
                          <div class="card-body w-100 ">
                            <h4 class=" text-center">{{__('Login')}}</h4>
            
                            <div class="form-group input-group">
                              <input class="form-control" type="email" name="login_email" placeholder="{{ __('Email') }}" value="{{old('login_email')}}"><span class="input-group-addon"><i class="icon-mail"></i></span>
                            </div>
                            @error('login_email')
                              <p class="text-danger">{{$message}}</p>
                              @enderror
            
                            <div class="form-group input-group">
                              <input class="form-control" type="password" name="login_password" placeholder="{{ __('Password') }}" ><span class="input-group-addon"><i class="icon-lock"></i></span>
                            </div>
                            @error('login_password')
                                <p class="text-danger">{{$message}}</p>
                            @enderror
            
                            <div class="d-flex flex-wrap justify-content-between padding-bottom-1x">
                              <div class="custom-control custom-checkbox">
                                <input class="custom-control-input" type="checkbox" id="remember_me">
                                <label class="custom-control-label" for="remember_me">{{__('Remember me')}}</label>
                              </div><a class="navi-link" href="{{route('user.forgot')}}">{{__('Forgot password?')}}</a>
                            </div>
                            <div class="text-center">
                              <button class="btn btn-primary margin-bottom-none w-100" type="submit"><span>{{ __('Login') }}</span></button>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 text-center mt-3">
                                @if($setting->facebook_check == 1)
                                <a class="facebook-btn mr-2" href="{{route('social.provider','facebook')}}">{{ __('Facebook login') }}
                                </a>
                                @endif
                                @if($setting->google_check == 1)
                                <a class="google-btn" href="{{route('social.provider','google')}}"> {{ __('Google login') }}
                                </a>
                                @endif
                              </div>
                              </div>
                          </div>
                        </form>
                      </div>
                    </div>
            
                  </div>
                </div>
              </div>
              
            </div>
          </section>
        </div>
  </div>

  <!-- Site Footer-->
@endsection