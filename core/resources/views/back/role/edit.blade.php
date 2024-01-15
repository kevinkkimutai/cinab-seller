@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Role Edit') }}</b> </h3>
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
								<form class="admin-form" action="{{ route('back.role.update',$role->id) }}" method="POST"
									enctype="multipart/form-data">
									@method('PUT')
                                    @csrf

									@include('alerts.alerts')
									@php
										if($role->section != 'null'){
											$section = json_decode($role->section,true);
										}else{
											$section = [];
										}
									@endphp

									<div class="form-group">
										<label for="name">{{ __('Name') }} *</label>
										<input type="text" name="name" class="form-control" id="name"
											placeholder="{{ __('Enter Role Name') }}" value="{{$role->name}}" >
									</div>
								<div class="row">
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Categories" {{in_array('Manage Categories',$section) ? 'checked' : ''}} id=""> {{ __('Manage Categories') }}
										</div>
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Products" {{in_array('Manage Products',$section) ? 'checked' : ''}} id=""> {{ __('Manage Products') }}
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Orders" {{in_array('Manage Orders',$section) ? 'checked' : ''}} id=""> {{ __('Manage Orders') }}
										</div>
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Transactions" {{in_array('Transactions',$section) ? 'checked' : ''}} id=""> {{ __('Transactions') }}
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Ecommerce" {{in_array('Ecommerce',$section) ? 'checked' : ''}} id=""> Ecommerce
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Customer List" {{in_array('Customer List',$section) ? 'checked' : ''}} id=""> {{ __('Customer List') }}
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manages Tickets" {{in_array('Manages Tickets',$section) ? 'checked' : ''}} id=""> {{ __('Manages Tickets') }}
										</div>
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Site" {{in_array('Manage Site',$section) ? 'checked' : ''}} id=""> {{ __('Manage Site') }}
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Faqs Contents" {{in_array('Manage Faqs Contents',$section) ? 'checked' : ''}} id=""> {{ __('Manage Faqs Contents') }}
										</div>
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage Blogs" {{in_array('Manage Blogs',$section) ? 'checked' : ''}} id=""> {{ __('Manage Blogs') }}
										</div>
	
										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manages Pages" {{in_array('Manages Pages',$section) ? 'checked' : ''}} id=""> {{ __('Manages Pages') }}
										</div>


										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Subscribers List" {{in_array('Subscribers List',$section) ? 'checked' : ''}} id=""> {{ __('Subscribers List') }}
										</div>

										<div class="col-md-4 my-3">
											<input type="checkbox" name="section[]" value="Manage System User" {{in_array('Manage System User',$section) ? 'checked' : ''}} id=""> {{ __('Manage System User') }}
										</div>


									<div class="col-md-4 my-3">
										<input type="checkbox" name="section[]" value="System Backup" {{in_array('System Backup',$section) ? 'checked' : ''}} id=""> {{ __('System Backup') }}
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
