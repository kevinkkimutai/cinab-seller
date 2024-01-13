@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- State Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 "><b>{{ __('Update State') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.state.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
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
								<form class="admin-form" action="{{ route('back.state.update',$state->id) }}"
									method="POST" enctype="multipart/form-data">

                                    @csrf

                                    @method('PUT')

									@include('alerts.alerts')

									<div class="form-group">
										<label for="title">{{ __('Name') }} *</label>
										<input type="text" name="name" class="form-control" id="title"
											placeholder="{{ __('Enter Name') }}" value="{{ $state->name }}" >
									</div>

                                    <div class="form-group">
                                        <label for="price">{{ __('Price') }} </label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
												<span class="input-group-text">
													<select name="type" class="form-control">
														<option value="fixed" {{$state->type == 'fixed' ? 'selected' : ''}}>{{PriceHelper::adminCurrency()}}</option>
														<option value="percentage" {{$state->type == 'percentage' ? 'selected' : ''}}>%</option>
													</select>
                                                </span>
                                            </div>
                                            <input type="text" id="price"
                                                name="price" class="form-control"
                                                placeholder="{{ __('Enter Price') }}"
                                                value="{{ $state->price }}" >
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
