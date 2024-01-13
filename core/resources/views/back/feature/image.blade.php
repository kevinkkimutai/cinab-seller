@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="d-sm-flex align-items-center justify-content-between">
        <h5 class=" mb-0 text-gray-800 pl-3">{{ __('Feature Image') }}</h5>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('back.dashboard') }}">{{ __('Dashboard') }}</a></li>
            <li class="breadcrumb-item"><a href="#">{{ __('Manage Features') }}</a></li>
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
								<form class="admin-form" action="{{ route('back.setting.update') }}" method="POST" enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="name">{{ __('Current Feature Image') }}</label>
										<div class="col-lg-12 pb-1">
											<img class="admin-img"
												src="{{ $setting->feature_image ? asset('assets/images/'.$setting->feature_image) : asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										</div>
										<span>{{ __('Image Size Should Be 570 x 855.') }}</span>
									</div>

									<div class="form-group position-relative text-center">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="feature_image" id="file" aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Feature Image...') }}</span>
										</label>
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
