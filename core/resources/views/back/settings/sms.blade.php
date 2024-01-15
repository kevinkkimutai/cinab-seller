@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"> <b>{{ __('SMS Setting') }}</b> </h3>
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
						<div class="col-lg-12">
							<div class="p-5">
								<form class="admin-form" action="{{ route('back.sms.update') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

                                    <div class="container pl-0 pr-0 ml-0 mr-0 w-100 mw-100">
                                        <div id="tabs">
                                          <ul class="nav nav-pills nav-secondary nav-justified mb-3" role="tablist">
                                            <li class="nav-item">
                                              <a class="nav-link active" data-toggle="pill" href="#conf">{{ __('Configuration') }}</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link" data-toggle="pill" href="#template">{{ __('SMS Section') }}</a>
                                            </li>

                                          </ul>

                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                          <div id="conf" class="container tab-pane active"><br>


                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.update') }}" method="POST" enctype="multipart/form-data">

                                                    @csrf
                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                          <input type="checkbox" class="switch switch-bootstrap status radio-check" name="is_twilio" value="1" {{ $setting->is_twilio == 1 ? 'checked' : '' }}>
                                                          <span class="switch-body"></span>
                                                          <span class="switch-text">{{ __('SMS Service') }}</span>
                                                        </label>
                                                    </div>



                                                    {{-- <div class="form-check  mb-4">
                                                        <input type="checkbox" data-toggle="toggle" data-onstyle="primary" data-style="btn-round" name="is_twilio" class="form-check-input radio-check" value="1" id="is_twilio" {{ $setting->is_twilio == 1 ? 'checked' : '' }}>
                                                        <label class="form-check-label" for="is_twilio">{{ __('SMS Service') }}</label>
                                                    </div> --}}

                                                    <div class="radio-show {{ $setting->is_twilio == 0 ? 'd-none' : '' }}">

                                                        <div class="form-group ">
                                                            <label for="twilio_sid">{{ __('Twilio Sid') }}</label>
                                                            <input type="text" class="form-control " id="twilio_sid" name="twilio_sid" placeholder="{{ __('Enter Twilio Sid') }}" value="{{ $setting->twilio_sid }}" >
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="twilio_token">{{ __('Twilio Token') }}</label>
                                                            <input type="text" class="form-control " id="twilio_token" name="twilio_token" placeholder="{{ __('Enter Twilio Token') }}" value="{{ $setting->twilio_token }}" >
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="twilio_form_number">{{ __('Twilio Form Number') }}</label>
                                                            <input type="text" class="form-control " id="twilio_form_number" name="twilio_form_number" placeholder="{{ __('Enter Twilio Form Number') }}" value="{{ $setting->twilio_form_number }}" >
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="twilio_country_code">{{ __('Country Number Code') }}</label>
                                                            <input type="text" class="form-control" id="twilio_country_code" name="twilio_country_code" placeholder="{{ __('Country Number Code') }}" value="{{ $setting->twilio_country_code }}">
                                                           <strong>{{__('Note')}}</strong> : <small class="text-primary">{{__('Must use country code before (+) sign')}}</small>
                                                        </div>

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-100">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="template" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.update') }}" method="POST" enctype="multipart/form-data">
                                                    @csrf
                                                    @php
                                                        $sms_section = json_decode($setting->twilio_section,true);
                                                    @endphp
                                                        <p>Order Number : {order_number} <code>If you need order number then use this tag</code></p>
                                                        
                                                        <div class="form-group ">
                                                            <label for="order_purchase">{{ __('Order Purchase') }}</label>
                                                            <textarea name="twilio_section['purchase']" class="form-control" id="order_purchase" placeholder="{{__('Enter Message')}}">{{$sms_section["'purchase'"]}}</textarea>
                                                        </div>

                                                        <div class="form-group ">
                                                            <label for="order_status">{{ __('Order Status') }}</label>
                                                            <textarea name="twilio_section['order_status']" class="form-control" id="order_status" placeholder="{{__('Enter Message')}}">{{$sms_section["'order_status'"]}}</textarea>
                                                        </div>

                                                        <div class="form-group d-flex justify-content-center">
                                                            <button type="submit" class="btn btn-secondary btn-block w-100">{{ __('Submit') }}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>

                                      </div>
									<div>
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
