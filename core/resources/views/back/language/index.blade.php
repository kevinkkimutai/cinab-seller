@extends('master.back')

@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Language') }}</b></h3>
                </div>
        </div>
    </div>

    {{-- Create Table Btn --}}


    @include('alerts.alerts')


	<!-- DataTales -->
	<div class="card shadow mb-4">
        <div class="card-header">
            <h4 class="card-title">{{ __('Frontend Translate') }}</h4>
        </div>
		<div class="card-body">
			<div class="gd-responsive-table">
				<table class="table table-bordered table-striped"  width="100%" cellspacing="0">

					<thead>
						<tr>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Direction') }}</th>
                            <th>{{ __('Language') }}</th>
							<th>{{ __('Actions') }}</th>
						</tr>
					</thead>

					<tbody>
                        @foreach($datas as $data)
                            @if ($data->type == 'Website')
                            <tr>
                                <td>
                                    {{ $data->language }}
                                </td>
                                <td>
                                    @if ($data->rtl == 0)
                                        {{__('LTR')}}
                                    @else
                                        {{__('RTL')}}
                                    @endif
                                </td>

                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-{{  $data->is_default == 1 ? 'success' : 'danger'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{  $data->is_default == 1 ? __('Active') : __('Deactive')  }}
                                        </button>
                                        <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="{{ route('back.language.status',[$data->id,1]) }}">{{ __('Active') }}</a>
                                        <a class="dropdown-item" href="{{ route('back.language.status',[$data->id,0]) }}">{{ __('Deactive') }}</a>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-list">
                                        <a class="btn btn-secondary btn-sm "
                                            href="{{ route('back.language.edit',$data->id) }}">
                                            <i class="fas fa-edit"></i> {{ __('Edit') }}
                                        </a>

                                    </div>
                                </td>
                            </tr>
                            @endif
                        @endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>

    <div class="card shadow mb-4">
        <div class="card-header">
            <h4 class="card-title">{{ __('Dashboard Translate') }}</h4>
        </div>
		<div class="card-body">
			<div class="gd-responsive-table">
				<table class="table table-bordered table-striped"  width="100%" cellspacing="0">

					<thead>
						<tr>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Direction') }}</th>
                            <th>{{ __('Language') }}</th>
							<th>{{ __('Actions') }}</th>
						</tr>
					</thead>

					<tbody>
                        @foreach($datas as $data)
                            @if ($data->type == 'Dashboard')
                            <tr>
                                <td>
                                    {{ $data->language }}
                                </td>
                                <td>
                                    @if ($data->rtl == 0)
                                        {{__('LTR')}}
                                    @else
                                        {{__('RTL')}}
                                    @endif
                                </td>

                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-{{  $data->is_default == 1 ? 'success' : 'danger'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{  $data->is_default == 1 ? __('Active') : __('Deactive')  }}
                                        </button>
                                        <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="{{ route('back.language.status',[$data->id,1]) }}">{{ __('Active') }}</a>
                                        <a class="dropdown-item" href="{{ route('back.language.status',[$data->id,0]) }}">{{ __('Deactive') }}</a>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-list">
                                        <a class="btn btn-secondary btn-sm "
                                            href="{{ route('back.language.edit',$data->id) }}">
                                            <i class="fas fa-edit"></i> {{ __('Edit') }}
                                        </a>

                                    </div>
                                </td>
                            </tr>
                            @endif
                        @endforeach
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
			{{ __('You are going to delete this Currency. All contents related with this Currency will be lost.') }} {{ __('Do you want to delete it?') }}
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
