@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="d-sm-flex align-items-center justify-content-between">
        <h5 class=" mb-0 text-gray-800 pl-3">{{ __('Update Feature') }} <a class="btn btn-primary btn-sm" href="{{route('back.feature.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a></h5>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('back.dashboard') }}">{{ __('Dashboard') }}</a></li>
            <li class="breadcrumb-item"><a href="#">{{ __('Manage Features') }}</a></li>
        </ol>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-8">
							<div class="p-5">
								<form class="admin-form" action="{{ route('back.feature.update',$feature->id) }}"
									method="POST" enctype="multipart/form-data">

                                    @csrf

                                    @method('PUT')

									@include('alerts.alerts')

                                    <input type="hidden" id="icon-value" value="{{ $feature->icon }}">

									<div class="form-group">
										<label for="icon">{{ __('Icon') }} *</label>

                                        <div name="icon"  data-align="left" data-header="false" data-footer="false" data-search="true" data-rows="3" data-cols="17" data-search-text="{{ __('Search...') }}" role="iconpicker"  data-icon="{{ $feature->icon }}"></div>

									</div>

									<div class="form-group">
										<label for="title">{{ __('Title') }} *</label>
										<textarea name="title" id="title" class="form-control" rows="5"
											placeholder="{{ __('Enter Title') }}"
											>{{ $feature->title }}</textarea>
									</div>


								<div class="form-group">
										<button type="submit"
											class="btn btn-secondary ">{{ __('Submit') }}</button>
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
