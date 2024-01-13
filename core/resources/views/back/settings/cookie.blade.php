@extends('master.back')

@section('content')

<div class="container-fluid">

   	<!-- Page Heading -->
       <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"> <b>{{ __('Cookie Alert') }}</b> </h3>
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
								<div class="admin-form">

									@include('alerts.alerts')

                                    <div class="row justify-content-center">

                                        <div class="col-lg-8">

                                            <form action="{{ route('back.setting.update') }}" method="POST"
                                            enctype="multipart/form-data">

                                            @csrf
                                                <div class="form-group">
                                                    <label class="switch-primary">
                                                      <input type="checkbox" class="switch switch-bootstrap status radio-check" name="is_cookie" value="1" {{ $setting->is_cookie == 1 ? 'checked' : '' }}>
                                                      <span class="switch-body"></span>
                                                      <span class="switch-text">{{ __('Cookie Alert') }}</span>
                                                    </label>
                                                </div>

                                                

                                                <div class="image-show {{ $setting->is_cookie == 1 ? '' : 'd-none' }}">
                                                   
                                                    <div class="form-group">
                                                        <label for="cookie_text">{{ __('Cookie Text') }} *</label>
                                                        <input type="text" name="cookie_text" class="form-control" id="cookie_text"
                                                            placeholder="{{ __('Cookies Text') }}" value="{{ $setting->cookie_text }}" >
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   

@endsection
