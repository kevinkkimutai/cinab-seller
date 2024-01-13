@extends('master.back-login')

@section('content')


        <div class="wrapper wrapper-login">
            <div class="container container-login animated fadeIn">
                <h3 class="text-center">{{ __('Change Password') }}</h3>
                <div class="login-form">

                    <form action="{{ route('back.change.password') }}" method="POST">

                        @csrf

                        @include('alerts.alerts')



                        <div class="form-group form-floating-label">
                            <input id="new_password" name="new_password" type="password" class="form-control input-border-bottom" >
                            <label for="new_password" class="placeholder">{{ __('New Password') }}</label>
                            
                        </div>

                        <div class="form-group form-floating-label">
                            <input id="renew_password" name="renew_password" type="password" class="form-control input-border-bottom" >
                            <label for="renew_password" class="placeholder">{{ __('Re-Type New Password') }}</label>
                            
                        </div>

                        <input type="hidden" name="file_token" value="{{ $token }}">

                        <div class="form-action mb-3">
                            <button type="submit" class="btn btn-secondary  btn-login">{{ __('Change Password') }}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


@endsection
