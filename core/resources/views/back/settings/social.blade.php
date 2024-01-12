@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Social Login') }}</b></h3>
                   </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row">
                        <div class="col-4 col-md-3">
                            <div class="nav flex-column m-3 nav-pills nav-secondary" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                    <a class="nav-link active" data-toggle="pill" href="#facebook">{{ __('Facebook') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#google">{{ __('Google') }}</a>


                            </div>
                        </div>
						<div class="col-lg-9">
							<div class="p-5">
								<form class="admin-form" action="{{ route('back.setting.update') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

                                    <div class="container pl-0 pr-0 ml-0 mr-0 w-100 mw-100">
                                        <div id="tabs">

                                        <!-- Tab panes -->
                                        <div class="tab-content">

                                          <div id="facebook" class="container tab-pane active"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                          <input type="checkbox" class="switch switch-bootstrap status radio-check" name="facebook_check" value="1" {{ $setting->facebook_check == 1 ? 'checked' : '' }}>
                                                          <span class="switch-body"></span>
                                                          <span class="switch-text">{{ __('Facebook Login') }}</span>
                                                        </label>
                                                    </div>

                                                    <div class="radio-show {{ $setting->facebook_check == 0 ? 'd-none' : '' }}">

                                                        <div class="form-group ">
                                                            <label for="facebook_client_id">{{ __('App ID') }}</label> <small>({{ __('From developers.facebook.com') }})</small>
                                                            <input type="text" class="form-control" id="facebook_client_id" name="facebook_client_id" placeholder="{{ __('Enter App ID') }}" value="{{ $setting->facebook_client_id }}" ="">
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="facebook_client_secret">{{ __('App Secret') }}</label> <small>({{ __('From developers.facebook.com') }})</small>
                                                            <input type="text" class="form-control" id="facebook_client_secret" name="facebook_client_secret" placeholder="{{ __('Enter App Secret') }}" value="{{ $setting->facebook_client_secret }}" ="">
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="facebook_redirect">{{ __('Redirect URL') }}</label> <small>({{ __('Set this to your Valid OAuth Redirect URI in developers.facebook.com') }})</small>
                                                            <input type="text" class="form-control" id="facebook_redirect" name="facebook_redirect" placeholder="{{ __('Enter Redirect URL') }}" value="{{ $facebook_url }}" readonly>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="google" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                          <input type="checkbox" class="switch switch-bootstrap status radio-check" name="google_check" value="1" {{ $setting->google_check == 1 ? 'checked' : '' }}>
                                                          <span class="switch-body"></span>
                                                          <span class="switch-text">{{ __('Google Login') }}</span>
                                                        </label>
                                                    </div>

                                                    <div class="radio-show {{ $setting->google_check == 0 ? 'd-none' : '' }}">

                                                        <div class="form-group ">
                                                            <label for="google_client_id">{{ __('Client ID') }}</label> <small>({{ __('From console.cloud.google.com') }})</small>
                                                            <input type="text" class="form-control " id="google_client_id" name="google_client_id" placeholder="{{ __('Enter Client ID') }}" value="{{ $setting->google_client_id }}" ="">
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="google_client_secret">{{ __('Client Secret') }}</label> <small>({{ __('From console.cloud.google.com') }})</small>
                                                            <input type="text" class="form-control " id="google_client_secret" name="google_client_secret" placeholder="{{ __('Enter Client Secret') }}" value="{{ $setting->google_client_secret }}" ="">
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="google_redirect">{{ __('Redirect URL') }}</label> <small>({{ __('Set this to your Redirect URL in console.cloud.google.com') }})</small>
                                                            <input type="text" class="form-control " id="google_redirect" name="google_redirect" placeholder="{{ __('Enter Redirect URL') }}" value="{{ $google_url }}" readonly>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                          </div>

                                        </div>

                                    </div>

                                      </div>

									<div>

                                        <div class="form-group d-flex justify-content-center">
                                            <button type="submit" class="btn btn-secondary">{{ __('Submit') }}</button>
                                        </div>

								</form>

							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>

</div>

@endsection
