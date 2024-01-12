@extends('master.back')

@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Offer Banner') }}</b> </h3>
                </div>
        </div>
    </div>

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body">
			@include('alerts.alerts')
			<div class="gd-responsive-table">
				<table class="table table-bordered table-striped" id="admin-table" width="100%" cellspacing="0">

					<thead>
						<tr>
              				<th width="20%">{{ __('Banner') }}</th>
              				<th width="25%">{{ __('Image') }}</th>
							<th width="20%">{{ __('Title') }}</th>
							<th width="20%">{{ __('Subtitle') }}</th>
							<th width="15%">{{ __('Status') }}</th>
							<th width="20%">{{ __('Actions') }}</th>
						</tr>
					</thead>

					<tbody>
                @include('back.banner.table',compact('datas'))
					</tbody>

				</table>
			</div>
		</div>
	</div>

</div>

</div>
<!-- End of Main Content -->

@endsection
