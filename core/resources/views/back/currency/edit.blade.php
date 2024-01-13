@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
            <h3 class="mb-0 bc-title"><b>{{ __('Edit Currency') }}</b> </h3>
            <a class="btn btn-primary btn-sm" href="{{route('back.currency.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
            </div></div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-12">
								<form class="admin-form" action="{{ route('back.currency.update',$currency->id) }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf
									@method('PUT')
									@include('alerts.alerts')

									<div class="form-group">
										<label for="name">{{ __('Currency Name') }} *</label>
										<input type="text" name="name" class="form-control" id="name"
											placeholder="{{ __('Currency Name') }}" value="{{ $currency->name }}" >
									</div>

									<div class="form-group">
										<label for="sign">{{ __('Currency Sign') }} *</label>
										<input type="text" name="sign" class="form-control" id="sign"
											placeholder="{{ __('Currency Sign') }}" value="{{$currency->sign}}" >
									</div>

									<div class="form-group">
										<label for="value">{{ __('Currency Value') }} *</label>
										<input type="text" name="value" class="form-control" id="value"
											placeholder="{{ __('Currency Value') }}" value="{{ $currency->value }}" >
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

@endsection
