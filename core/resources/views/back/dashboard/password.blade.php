@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="d-sm-flex align-items-center justify-content-between">
            <h3 class="mb-0 bc-title"><b>{{ __('Change Password') }}</b></h3>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('back.dashboard') }}">{{ __('Dashboard') }}</a></li>
            <li class="breadcrumb-item"><a href="#">{{ __('Change Password') }}</a></li>
        </ol>
        </div>
    </div>


	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-8">
							<div class="p-5">
								<form class="admin-form" action="{{ route('back.password.update') }}" method="POST" enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="current_password">{{ __('Current Password') }} *</label>
										<input type="password" name="current_password" class="form-control" id="current_password" placeholder="{{ __('Enter Your Current Password') }}" value="" >
									</div>


									<div class="form-group">
										<label for="new_password">{{ __('New Password') }} *</label>
										<input type="password" name="new_password" class="form-control" id="new_password" placeholder="{{ __('Enter Your New Password') }}" value="" >
									</div>

									<div class="form-group">
										<label for="renew_password">{{ __('Re-Type New Password') }} *</label>
										<input type="password" name="renew_password" class="form-control" id="renew_password"
											placeholder="{{ __('Re-Type Your New Password') }}" value="" >
									</div>


									<div class="form-group">
										<button type="submit" class="btn btn-secondary btn-block">{{ __('Submit') }}</button>
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
