@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"><b>{{ __('Create Sitemap') }}</b> </h3>
                <a class="btn btn-primary  btn-sm" href="{{route('admin.sitemap.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body p-0">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-10">
							<div class="p-5">
								<form class="admin-form" action="{{ route('admin.sitemap.store') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

                                    <input type="hidden" name="filename">

									<div class="form-group">
										<label for="sitemap_url">{{ __('Sitemap Url') }} *</label>

										<input type="text" name="sitemap_url" class="form-control" id="sitemap_url"
											placeholder="{{ __('Sitemap Url') }}" value="{{ old('sitemap_url') }}" required>
									</div>

									<div class="form-group text-center">
										<button type="submit" class="btn btn-secondary">{{ __('Submit') }}</button>
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
