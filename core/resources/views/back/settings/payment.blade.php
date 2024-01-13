@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0"><b>{{ __('Payment') }}</b></h3>
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
                        <div class="col-lg-3">
                            <div class="nav flex-column m-3 nav-pills nav-secondary" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                    <a class="nav-link active" data-toggle="pill" href="#cod">{{ __('Cash On Delivery') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#stripe">{{ __('Stripe') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#paypal">{{ __('Paypal') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#molly">{{ __('Mollie') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#paytm">{{ __('Paytm') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#razorpay">{{ __('Razorpay') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#sslcommerz">{{ __('SSL commerz') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#mercadopago">{{ __('Mercadopago') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#authorize">{{ __('Authorize.Net') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#paystack">{{ __('Paystack') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#flutterwave">{{ __('Flutterwave') }}</a>
                                    <a class="nav-link" data-toggle="pill" href="#bank">{{ __('Bank Transfer') }}</a>

                            </div>
                        </div>
						<div class="col-lg-9">
							<div class="p-5">
								<div class="admin-form">

									@include('alerts.alerts')

                                    <div class="container pl-0 pr-0 ml-0 mr-0 w-100 mw-100">
                                        <div id="tabs">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                          <div id="cod" class="container tab-pane active"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf
                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $cod->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Cash On Delivery') }}</span>
                                                        </label>
                                                    </div>

                                                        <div class="image-show {{ $cod->status == 1 ? '' : 'd-none' }}">

                                                            <div class="form-group">
                                                                <label for="name">{{ __('Enter Name') }} *</label>
                                                                <input type="text" class="form-control" name="name" id="name" value="{{$cod->name}}">
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="name">{{ __('Current Image') }}</label>
                                                                <div class="col-lg-12 pb-1">
                                                                    <img class="admin-setting-img"
                                                                        src="{{ $cod->photo ? asset('assets/images/'.$cod->photo) : asset('assets/images/placeholder.png') }}"
                                                                        alt="No Image Found">
                                                                </div>
                                                                <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                            </div>

                                                            <div class="form-group position-relative col-xl-12">
                                                                <label class="file">
                                                                    <input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                    <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                                </label>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="text">{{ __('Enter Text') }} *</label>
                                                                <textarea name="text" id="text" class="form-control " rows="5"
                                                                    placeholder="{{ __('Enter Text') }}"
                                                                    >{{ $cod->text }}</textarea>
                                                            </div>

                                                            <input type="hidden" name="unique_keyword" value="cod">

                                                        </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="stripe" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $stripe->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Stripe') }}</span>
                                                        </label>
                                                    </div>


                                                    <div class="image-show {{ $stripe->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $stripe->photo ? asset('assets/images/'.$stripe->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$stripe->name}}">
                                                        </div>
                                                        @foreach($stripeData as $pkey => $pdata)

                                                            <div class="form-group">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $stripe->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $stripe->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $pdata }}" >
                                                            </div>


                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $stripe->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="stripe">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="paypal" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $paypal->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Paypal') }}</span>
                                                        </label>
                                                    </div>


                                                    <div class="image-show {{ $paypal->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $paypal->photo ? asset('assets/images/'.$paypal->photo) : asset('assets/images/placeholder.png') }}"
                                                                    alt="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>


                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$paypal->name}}">
                                                        </div>

                                                        @foreach($paypalData as $pkey => $pdata)

                                                            @if($pkey == 'check_sandbox')

                                                                <div class="form-group  col-xl-4 col-md-6">
                                                                    <div class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $pdata == 1  ? 'checked' : '' }} id="{{ $pkey }}">
                                                                        <label class="custom-control-label" for="{{ $pkey }}">
                                                                        {{ __( $paypal->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            @else

                                                                <div class="form-group">
                                                                    <label for="inp-{{ __($pkey) }}">{{ __( $paypal->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                    <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $paypal->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $pdata }}" >
                                                                </div>

                                                            @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $paypal->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="paypal">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>
                                          <div id="molly" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $molly->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Mollie') }}</span>
                                                        </label>
                                                    </div>



                                                    <div class="image-show {{ $molly->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $molly->photo ? asset('assets/images/'.$molly->photo) : asset('assets/images/placeholder.png') }}"
                                                                    alt="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$molly->name}}">
                                                        </div>

                                                        @foreach($mollyData as $pkey => $pdata)

                                                        <div class="form-group">
                                                            <label for="inp-{{ __($pkey) }}">{{ __( $molly->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                            <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $molly->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $pdata }}" >
                                                        </div>


                                                    @endforeach

                                                        <input type="hidden" name="unique_keyword" value="mollie">

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $molly->text }}</textarea>
                                                        </div>

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="paytm" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $paytm->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Paytm') }}</span>
                                                        </label>
                                                    </div>



                                                    <div class="image-show {{ $paytm->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $paytm->photo ? asset('assets/images/'.$paytm->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$paytm->name}}">
                                                        </div>

                                                        @foreach($paytmData as $pakey => $paytmDat)

                                                        @if($pakey == 'paytm_mode')
                                                              
                                                                <div class="form-group  col-xl-4 col-md-6">
                                                                    <div class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="pkey[{{ __($pakey) }}]" class="custom-control-input" {{ $paytmDat == 1  ? 'checked' : '' }} id="{{ $pakey }}" value="1">
                                                                        <label class="custom-control-label" for="{{ $pakey }}">
                                                                        {{ __( ucwords(str_replace('_',' ',$pakey)) ) }}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            @else

                                                                <div class="form-group">
                                                                    <label for="inp-{{ __($pakey) }}">{{ __( $paytm->name.' '.ucwords(str_replace('_',' ',$pakey)) ) }}</label>
                                                                    <input type="text" class="form-control" id="inp-{{ __($pakey) }}" name="pakey[{{ __($pakey) }}]"  placeholder="{{ __( $paytm->name.' '.ucwords(str_replace('_',' ',$pakey)) ) }}" value="{{ $paytmDat }}" >
                                                                </div>
                                                            @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $paytm->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="paytm">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="sslcommerz" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $sslcommerz->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display sslcommerz') }}</span>
                                                        </label>
                                                    </div>


                                                    <div class="image-show {{ $sslcommerz->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $sslcommerz->photo ? asset('assets/images/'.$sslcommerz->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>


                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$sslcommerz->name}}">
                                                        </div>

                                                        @foreach($sslcommerzData as $pkey => $sslcommerzData)
                                                        @if($pkey == 'check_sandbox')

                                                                <div class="form-group  col-xl-4 col-md-6">
                                                                    <div class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $sslcommerzData == 1  ? 'checked' : '' }} id="ssl{{ $pkey }}">
                                                                        <label class="custom-control-label" for="ssl{{ $pkey }}">
                                                                        {{ __( $sslcommerz->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            @else
                                                                    <div class="form-group col-xl-12">
                                                                        <label for="inp-{{ __($pkey) }}">{{ __( $sslcommerz->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                        <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $sslcommerz->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $sslcommerzData }}" required>
                                                                    </div>
                                                            @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $sslcommerz->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="sslcommerz">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="mercadopago" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $mercadopago->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Mercadopago') }}</span>
                                                        </label>
                                                    </div>



                                                    <div class="image-show {{ $mercadopago->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $mercadopago->photo ? asset('assets/images/'.$mercadopago->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$mercadopago->name}}">
                                                        </div>

                                                        @foreach($mercadopagoData as $pkey => $mercadopagoData)

                                                        @if($pkey == 'check_sandbox')

                                                        <div class="form-group  col-xl-4 col-md-6">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $mercadopagoData == 1  ? 'checked' : '' }} id="authorize{{ $pkey }}">
                                                                <label class="custom-control-label" for="authorize{{ $pkey }}">
                                                                {{ __( $mercadopago->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        @else
                                                            <div class="form-group col-xl-12">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $mercadopago->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $mercadopago->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $mercadopagoData }}" required>
                                                            </div>
                                                        @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $mercadopago->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="mercadopago">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="authorize" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $authorize->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Authorize.Net') }}</span>
                                                        </label>
                                                    </div>


                                                    <div class="image-show {{ $authorize->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $authorize->photo ? asset('assets/images/'.$authorize->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$authorize->name}}">
                                                        </div>

                                                        @foreach($authorizeData as $pkey => $authorizeData)

                                                        @if($pkey == 'check_sandbox')

                                                        <div class="form-group  col-xl-4 col-md-6">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $authorizeData == 1  ? 'checked' : '' }} id="mer{{ $pkey }}">
                                                                <label class="custom-control-label" for="mer{{ $pkey }}">
                                                                {{ __( $authorize->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        @else
                                                            <div class="form-group col-xl-12">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $authorize->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $authorize->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $authorizeData }}" required>
                                                            </div>
                                                        @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $authorize->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="authorize">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                           <div id="paystack" class="container tab-pane"><br>

                                            <div class="row justify-content-center">

                                                <div class="col-lg-8">

                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $paystack->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Paystack') }}</span>
                                                        </label>
                                                    </div>



                                                    <div class="image-show {{ $paystack->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $paystack->photo ? asset('assets/images/'.$paystack->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$paystack->name}}">
                                                        </div>

                                                        @foreach($paystackData as $pkey => $paystackData)

                                                        @if($pkey == 'check_sandbox')

                                                        <div class="form-group  col-xl-4 col-md-6">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $paystackData->status == 1  ? 'checked' : '' }} id="mer{{ $pkey }}">
                                                                <label class="custom-control-label" for="mer{{ $pkey }}">
                                                                {{ __( $paystack->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        @else
                                                            <div class="form-group col-xl-12">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $paystack->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $paystack->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $paystackData }}" required>
                                                            </div>
                                                        @endif

                                                        @endforeach

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $paystack->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="paystack">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="bank" class="container tab-pane"><br>
                                            <div class="row justify-content-center">
                                                <div class="col-lg-8">
                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $bank->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Bank Transfer') }}</span>
                                                        </label>
                                                    </div>
                                                    <div class="image-show {{ $bank->status == 1 ? '' : 'd-none' }}">
                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $bank->photo ? asset('assets/images/'.$bank->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$bank->name}}">
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control text-editor" rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $bank->text }}</textarea>
                                                        </div>

                                                        <input type="hidden" name="unique_keyword" value="bank">

                                                    </div>

                                                        <div>

                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>

                                                        </div>

                                                    </form>

                                                </div>

                                            </div>

                                          </div>

                                          <div id="razorpay" class="container tab-pane"><br>
                                            <div class="row justify-content-center">
                                                <div class="col-lg-8">
                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $razorpay->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Razorpay') }}</span>
                                                        </label>
                                                    </div>

                                                    <div class="image-show {{ $razorpay->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $razorpay->photo ? asset('assets/images/'.$razorpay->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$razorpay->name}}">
                                                        </div>

                                                        @foreach($razorpayData as $pkey => $razorpayData)

                                                        @if($pkey == 'check_sandbox')

                                                        <div class="form-group  col-xl-4 col-md-6">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $razorpayData->status == 1  ? 'checked' : '' }} id="mer{{ $pkey }}">
                                                                <label class="custom-control-label" for="mer{{ $pkey }}">
                                                                {{ __( $razorpay->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        @else
                                                            <div class="form-group col-xl-12">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $razorpay->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $razorpay->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $razorpayData }}" required>
                                                            </div>
                                                        @endif
                                                        @endforeach
                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $razorpay->text }}</textarea>
                                                        </div>
                                                        <input type="hidden" name="unique_keyword" value="razorpay">
                                                    </div>
                                                        <div>
                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                          </div>


                                          <div id="flutterwave" class="container tab-pane"><br>
                                            <div class="row justify-content-center">
                                                <div class="col-lg-8">
                                                    <form action="{{ route('back.setting.payment.update') }}" method="POST"
                                                    enctype="multipart/form-data">

                                                    @csrf

                                                    <div class="form-group">
                                                        <label class="switch-primary">
                                                            <input type="checkbox" class="switch switch-bootstrap " name="status" value="1" {{ $flutterwave->status == 1 ? 'checked' : '' }}>
                                                            <span class="switch-body"></span>
                                                            <span class="switch-text">{{ __('Display Flutterwave') }}</span>
                                                        </label>
                                                    </div>

                                                    <div class="image-show {{ $flutterwave->status == 1 ? '' : 'd-none' }}">

                                                        <div class="form-group col-xl-12">
                                                            <label for="name">{{ __('Current Image') }}</label>
                                                            <div class="col-lg-12 pb-1">
                                                                <img class="admin-setting-img"
                                                                    src="{{ $flutterwave->photo ? asset('assets/images/'.$flutterwave->photo) : asset('assets/images/placeholder.png') }}"
                                                                    stripe="No Image Found">
                                                            </div>
                                                            <span>{{ __('Image Size Should Be 52 x 35.') }}</span>
                                                        </div>

                                                        <div class="form-group position-relative col-xl-12">
                                                            <label class="file">
                                                                <input type="file" class="upload-photo" name="photo" id="file" aria-label="File browser example">
                                                                <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                            </label>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="name">{{ __('Enter Name') }} *</label>
                                                            <input type="text" class="form-control" name="name" id="name" value="{{$flutterwave->name}}">
                                                        </div>

                                                        @foreach($flutterwaveData as $pkey => $flutterwaveData)

                                                        @if($pkey == 'check_sandbox')

                                                        <div class="form-group  col-xl-4 col-md-6">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="pkey[{{ __($pkey) }}]" class="custom-control-input" {{ $flutterwaveData->status == 1  ? 'checked' : '' }} id="mer{{ $pkey }}">
                                                                <label class="custom-control-label" for="mer{{ $pkey }}">
                                                                {{ __( $flutterwave->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        @else
                                                            <div class="form-group col-xl-12">
                                                                <label for="inp-{{ __($pkey) }}">{{ __( $flutterwave->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}</label>
                                                                <input type="text" class="form-control" id="inp-{{ __($pkey) }}" name="pkey[{{ __($pkey) }}]"  placeholder="{{ __( $flutterwave->name.' '.ucwords(str_replace('_',' ',$pkey)) ) }}" value="{{ $flutterwaveData }}" required>
                                                            </div>
                                                        @endif
                                                        @endforeach
                                                        <div class="form-group">
                                                            <label for="text">{{ __('Enter Text') }} *</label>
                                                            <textarea name="text" id="text" class="form-control " rows="5"
                                                                placeholder="{{ __('Enter Text') }}"
                                                                >{{ $flutterwave->text }}</textarea>
                                                        </div>
                                                        <input type="hidden" name="unique_keyword" value="flutterwave">
                                                    </div>
                                                        <div>
                                                            <div class="form-group d-flex justify-content-center">
                                                                <button type="submit" class="btn btn-secondary btn-block w-50">{{ __('Submit') }}</button>
                                                            </div>
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
					</div>
				</div>
			</div>
		</div>

	</div>

</div>

@endsection
