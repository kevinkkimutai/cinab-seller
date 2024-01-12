@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Role Create') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.role.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
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
						<div class="col-lg-10">
							<div class="p-5">
								<form class="admin-form" action="{{ route('back.role.store') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')


								<div class="form-group">
									<label for="name">{{ __('Name') }} *</label>
									<input type="text" name="name" class="form-control" id="name"
										placeholder="{{ __('Enter Role Name') }}" value="{{ old('name') }}" >
								</div>
								<div class="row">
									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Categories" id=""> {{ __('Manage Categories') }}
									</div>
									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Products" id=""> {{ __('Manage Products') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Orders" id=""> {{ __('Manage Orders') }}
									</div>
									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Transactions" id=""> {{ __('Transactions') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Ecommerce" id=""> {{ __('Ecommerce') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Customer List" id=""> {{ __('Customer List') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manages Tickets" id=""> {{ __('Manages Tickets') }}
									</div>
									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Site" id=""> {{ __('Manage Site') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Faqs Contents" id=""> {{ __('Manage Faqs Contents') }}
									</div>
									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage Blogs" id=""> {{ __('Manage Blogs') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manages Pages" id=""> {{ __('Manages Pages') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Subscribers List" id=""> {{ __('Subscribers List') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="Manage System User" id=""> {{ __('Manage System User') }}
									</div>

									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="System Backup" id=""> {{ __('System Backup') }}
									</div>

								</div>

								<div class="form-group">
										<button type="submit"
											class="btn btn-secondary ">{{ __('Submit') }}
                                        </button>
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
