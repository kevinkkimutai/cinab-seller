@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Add User') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.staff.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-12">
								<form class="admin-form" action="{{ route('back.staff.store') }}" method="POST" enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="name">{{ __('Current Image') }}</label>
										<br>
											<img class="admin-img"
												src="{{ asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										<br>
										<span class="mt-1">{{ __('Image Size Should Be 70 x 70.') }}</span>
									</div>

									<div class="form-group position-relative ">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file" aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>
									<div class="form-group">
										<label for="name">{{ __('User Name') }} *</label>
										<input type="text" name="name" class="form-control" id="name" placeholder="{{ __('User Name') }}"
											value="{{ old('name') }}" >
									</div>


									<div class="form-group">
										<label for="email">{{ __('Email Address') }} *</label>
										<input type="email" name="email" class="form-control" id="email"
											placeholder="{{ __('Email Address') }}" value="{{ old('email') }}" >
									</div>

									<div class="form-group">
										<label for="phone">{{ __('Phone Number') }} *</label>
										<input type="text" name="phone" class="form-control" id="phone"
											placeholder="{{ __('Phone Number') }}" value="{{ old('phone') }}" >
									</div>

									<div class="form-group">
										<label for="password">{{ __('Password') }} *</label>
										<input type="password" name="password" class="form-control" id="password"
											placeholder="{{ __('Password') }}" value="" >
									</div>

									<div class="form-group">
										<label for="role_id">{{ __('Select Role') }} *</label>
										<select name="role_id" id="role_id" class="form-control" >
											@foreach(DB::table('roles')->get() as $role)
											<option value="{{ $role->id }}">{{ $role->name }}</option>
											@endforeach
										</select>
									</div>


									<div class="form-group">
										<button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
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


@endsection
