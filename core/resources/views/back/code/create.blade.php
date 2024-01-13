@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Code Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"><b>{{ __('Create Coupon') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.code.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-12">
								<form class="admin-form" action="{{ route('back.code.store') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="title">{{ __('Title') }} *</label>
										<input type="text" name="title" class="form-control" id="title"
											placeholder="{{ __('Enter Title') }}" value="{{ old('title') }}" >
									</div>

									<div class="form-group">
										<label for="code">{{ __('Code') }} *</label>
										<input type="text" name="code_name" class="form-control" id="code"
											placeholder="{{ __('Enter Code') }}" value="{{ old('code_name') }}" >
									</div>

									<div class="form-group">
										<label for="no_of_times">{{ __('Number Of Times') }} *</label>
										<input type="number" name="no_of_times" class="form-control" id="no_of_times"
											placeholder="{{ __('Enter Number Of Times') }}" value="{{ old('no_of_times') }}" min="1" >
									</div>

                                    <div class="form-group">
                                        <label for="discount">{{ __('Discount') }}
                                            *</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">
													<select name="type" class="form-control">
														<option value="percentage">{{__('Percentage')}} (%)</option>
														<option value="amount">{{__('Amount')}} ({{ PriceHelper::adminCurrency() }})</option>
													</select>
												</span>
                                            </div>
                                            <input type="number" id="discount"
                                                name="discount" class="form-control"
                                                placeholder="{{ __('Enter Discount') }}"
                                                min="0" step="0.1"
                                                value="{{ old('discount') }}" >
                                        </div>
                                    </div>

									<div class="form-group">
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

@endsection
