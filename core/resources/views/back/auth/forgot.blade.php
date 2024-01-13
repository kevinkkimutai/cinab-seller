@extends('master.back-login')

@section('content')


        <div class="wrapper wrapper-login">
            <div class="container container-login animated fadeIn">
                <h3 class="text-center">{{ __('Forgot Password') }}</h3>
                <div class="login-form">

                    <form action="{{ route('back.forgot.submit') }}" method="POST">

                        @csrf

                        @include('alerts.alerts')

                        <div class="form-group form-floating-label">
                            <input id="username" name="email" type="email" class="form-control input-border-bottom" value="{{ old('email') }}" >
                            <label for="username" class="placeholder">{{ __('Email Address') }}</label>
                        </div>


                        <div class="row justify-content-center form-sub m-0">
                            <a href="{{ route('back.login') }}" class="link float-right">{{ __('Remember Password?') }}</a>
                        </div>

                        <div class="form-action mb-3">
                            <button type="submit" class="btn btn-secondary  btn-login">{{ __('Reset My Password') }}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


@endsection
