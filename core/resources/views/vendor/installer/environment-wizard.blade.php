@extends('vendor.installer.layouts.master')

@section('template_title')
    {{ trans('installer_messages.environment.wizard.templateTitle') }}
@endsection

@section('title')
    <i class="fa fa-database fa-fw" aria-hidden="true"></i>
    {!! trans('installer_messages.environment.wizard.title') !!}
@endsection

@section('container')
    <div class="tabs tabs-full">
        @if(session()->has('license_success'))
            <div class="alert alert-success" style="background-color: #d4edda;" id="license_alert">
                <p style="margin-bottom: 0px;color: #155724;">{{session()->get('license_success')}}</p>
            </div>
        @endif

        @if(session()->has('domin_url'))
            <div class="alert alert-success" style="background-color: #d4edda;" id="license_alert">
                <strong>This Purchase Code Already Use for other Domin :</strong>
                @foreach (session()->get('domin_url') as $item)
                    <p style="margin-bottom: 0px;color: #155724;">{{ $item }}</p>
                @endforeach
                <strong>
                     Envato not allow to install multiple domin. One purched codes for one Domin.
                     Author can take action any time for that.
                    <br>
                    Author Contact : geniusdevs24@gmail.com 
                </strong>
            </div> 
        @endif

        <form method="post" action="{{ route('LaravelInstaller::environmentSaveWizard') }}" class="tabs-wrap">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">

            <div>
                <div class="form-group {{ $errors->has('app_name') ? ' has-error ' : '' }}">
                    <label for="app_name">
                        App Name
                    </label>
                    <input type="text" name="app_name" id="app_name" value="" placeholder="App Name" />
                    @if ($errors->has('app_name'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('app_name') }}
                        </span>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('app_debug') ? ' has-error ' : '' }}" style="margin-bottom: 5px;">
                    <label for="app_debug">
                        App Debug
                    </label>
                    <label for="app_debug_true">
                        <input type="radio" name="app_debug" id="app_debug_true" value=true />
                        True
                    </label>
                    <label for="app_debug_false">
                        <input type="radio" name="app_debug" id="app_debug_false" value=false checked />
                        False
                    </label>
                    @if ($errors->has('app_debug'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('app_debug') }}
                        </span>
                    @endif
                </div>


                <div class="form-group {{ $errors->has('app_url') ? ' has-error ' : '' }}">
                    <label for="app_url">
                        App Url
                    </label>
                    <input type="url" name="app_url" id="app_url" value="http://localhost" placeholder="App Url" />
                    @if ($errors->has('app_url'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('app_url') }}
                        </span>
                    @endif
                </div>


                <div class="form-group {{ $errors->has('database_hostname') ? ' has-error ' : '' }}">
                    <label for="database_hostname">
                       Database Host
                    </label>
                    <input type="text" name="database_hostname" id="database_hostname" value="127.0.0.1" placeholder="Database Host" />
                    @if ($errors->has('database_hostname'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('database_hostname') }}
                        </span>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('database_name') ? ' has-error ' : '' }}">
                    <label for="database_name">
                        Database Name
                    </label>
                    <input type="text" name="database_name" id="database_name" value="" placeholder="Database Name" />
                    @if ($errors->has('database_name'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('database_name') }}
                        </span>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('database_username') ? ' has-error ' : '' }}">
                    <label for="database_username">
                       User Name
                    </label>
                    <input type="text" name="database_username" id="database_username" value="" placeholder="User Name" />
                    @if ($errors->has('database_username'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('database_username') }}
                        </span>
                    @endif
                </div>

                <div class="form-group {{ $errors->has('database_password') ? ' has-error ' : '' }}">
                    <label for="database_password">
                        Database Password
                    </label>
                    <input type="password" name="database_password" id="database_password" value="" placeholder="Database Password" />
                    @if ($errors->has('database_password'))
                        <span class="error-block">
                            <i class="fa fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
                            {{ $errors->first('database_password') }}
                        </span>
                    @endif
                </div>

                <div class="buttons">
                    <button class="button" type="submit">
                        Install
                        <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

        </form>

    </div>
@endsection

