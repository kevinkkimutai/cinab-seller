@extends('master.back')
@section('styles')
	<link rel="stylesheet" href="{{asset('assets/back/css/datepicker.css')}}">
@endsection
@section('content')



<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"><b>{{request()->input('type') ? request()->input('type') : __('All')}} {{ __('Orders') }}</b></h3>
                <div class="right">
                <a href="{{route('back.csv.order.export')}}" class="btn btn-info btn-sm d-inline-block">{{__('CSV Export')}}</a>
                  <form class="d-inline-block" action="{{route('back.bulk.delete')}}" method="get">
                    <input type="hidden" value="" name="ids[]" id="bulk_delete">
                    <input type="hidden" value="orders" name="table">
                    <button class="btn btn-danger btn-sm">{{__('Delete')}}</button>
                  </form>
              </div>
              </div>
        </div>
    </div>

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body">

        <form action="{{route('back.order.index')}}" method="GET">
          <div class="row mb-4 justify-content-center">
            <div class="col-md-6 col-sm-6 col-lg-4">
                <div class="form-group p-0">
                <label for="start_date">{{ __('Start Date') }} *</label>
                <input type="text" name="start_date" id="datepicker" class="form-control datepicker"
                    id="start_date"
                    placeholder="{{ __('Start Date') }}"
                    value="">
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-4">
                <div class="form-group  p-0">
                <label for="end_date">{{ __('End Date') }} *</label>
                <input type="text" name="end_date" id="datepicker1" class="form-control datepicker"
                    id="end_date"
                    placeholder="{{ __('End Date') }}"
                    value="">
                </div>
            </div>
            <div class="col-lg-12 text-center mt-3">
                <button class="btn btn-success py-1 mr-2">{{__('Filter')}}</button>
                <a href="{{route('back.order.index')}}" class="btn btn-info py-1">{{__('Reset')}}</a>
            </div>
        </div>
        </form>


			@include('alerts.alerts')
			<div class="gd-responsive-table">
				<table class="table table-bordered table-striped" id="admin-table" width="100%" cellspacing="0">

					<thead>
						<tr>
              <th> <input type="checkbox" data-target="order-bulk-delete" class="form-control bulk_all_delete"> </th>
              <th>{{ __('Order ID') }}</th>
              <th>{{ __('User') }}</th>
              <th>{{ __('Total Amount') }}</th>
              <th>{{ __('Payment Status') }}</th>
              <th>{{ __('Order Status') }}</th>
							<th>{{ __('Actions') }}</th>
						</tr>
					</thead>

					<tbody>
              @include('back.order.table',compact('datas'))
					</tbody>

				</table>
			</div>
		</div>
	</div>

</div>



{{-- STATUS MODAL --}}

<div class="modal fade" id="statusModal" tabindex="-1" role="dialog" aria-labelledby="statusModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

		<!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ __('Update Status?') }}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
		</div>

		<!-- Modal Body -->
        <div class="modal-body">
			{{ __('You are going to update the status.') }} {{ __('Do you want proceed?') }}
		</div>

		<!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Cancel') }}</button>
            <a href="" class="btn btn-ok btn-success">{{ __('Update') }}</a>
		</div>

      </div>
    </div>
  </div>

{{-- STATUS MODAL ENDS --}}

{{-- DELETE MODAL --}}

<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="confirm-deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

  <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ __('Confirm Delete?') }}</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
  </div>

  <!-- Modal Body -->
      <div class="modal-body">
        {{ __('You are going to delete this order. All contents related with this order will be lost.') }} {{ __('Do you want to delete it?') }}
  </div>

  <!-- Modal footer -->
      <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Cancel') }}</button>
    <form action="" class="d-inline btn-ok" method="POST">

      @csrf
      @method('DELETE')
   <button type="submit" class="btn btn-danger">{{ __('Delete') }}</button>

    </form>
  </div>

    </div>
  </div>
</div>

{{-- DELETE MODAL ENDS --}}
@endsection
