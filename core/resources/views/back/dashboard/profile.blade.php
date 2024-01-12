@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="d-sm-flex align-items-center justify-content-between">
        <h3 class="mb-0 bc-title"><b>{{ __('Update Profile') }}</b></h3>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('back.dashboard') }}">{{ __('Dashboard') }}</a></li>
            <li class="breadcrumb-item"><a href="#">{{ __('Update Profile') }}</a></li>
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
								<form class="admin-form" action="{{ route('back.profile.update') }}" method="POST" enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="name">{{ __('Current Image') }} </label>
										<div class="col-lg-12 pb-1">
											<img class="admin-img"
												src="{{ $data->photo ? asset('assets/images/'.$data->photo) : asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										</div>
										<span>{{ __('Image Size Should Be 40 x 40.') }}</span>
									</div>

									<div class="form-group position-relative text-center">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>
									<div class="form-group">
										<label for="name">{{ __('User Name') }} *</label>
										<input type="text" name="name" class="form-control" id="name" placeholder="{{ __('User Name') }}"
											value="{{$data->name}}" >
									</div>


									<div class="form-group">
										<label for="email">{{ __('Email Address') }} *</label>
										<input type="email" name="email" class="form-control" id="email"
											placeholder="{{ __('Email Address') }}" value="{{$data->email}}" >
									</div>

									<div class="form-group">
										<label for="phone">{{ __('Phone Number') }} *</label>
										<input type="text" name="phone" class="form-control" id="phone"
											placeholder="{{ __('Phone Number') }}" value="{{$data->phone}}" >
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
