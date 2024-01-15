@extends('master.back')

@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"><b>{{ __('Transactions') }}</b></h3>
                <div class="right">
                    <a href="{{route('back.csv.transaction.export')}}" class="btn btn-info btn-sm d-inline-block">{{__('CSV Export')}}</a>
                    <form  class="d-inline-block" action="{{route('back.bulk.delete')}}" method="get">
                        <input type="hidden" value="" name="ids[]" id="bulk_delete">
                        <input type="hidden" value="transactions" name="table">
                        <button class="btn btn-danger btn-sm">{{__('Delete')}}</button>
                    </form>
                </div>
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
							<th> <input type="checkbox" data-target="transaction-bulk-delete" class="form-control bulk_all_delete"> </th>
							<th>{{ __('Customer Email') }}</th>
							<th>{{ __('Transaction ID') }}</th>
							<th>{{ __('Order Status') }}</th>
							<th>{{ __('Payment Status') }}</th>
							<th>{{ __('Total Amount') }}</th>
							<th>{{ __('Action') }}</th>
						</tr>
					</thead>

					<tbody>
                		@include('back.transactions.table',compact('datas'))
					</tbody>

				</table>
			</div>
		</div>
	</div>

</div>

</div>
<!-- End of Main Content -->

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
			{{ __('Are you sure ') }} {{ __('Do you want to delete it?') }}
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
