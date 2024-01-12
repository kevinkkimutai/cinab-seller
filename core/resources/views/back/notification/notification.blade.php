@extends('master.back')

@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="d-sm-flex align-items-center justify-content-between">
        <h5 class=" mb-0 text-gray-800 pl-3">{{ __('Manage Features') }}</h5>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('back.dashboard') }}">{{ __('Dashboard') }}</a></li>
            <li class="breadcrumb-item"><a href="#">{{ __('Notifications List') }}</a></li>
        </ol>
        </div>
    </div>


	<div class="card shadow mb-4">
		<div class="card-body">
			@include('alerts.alerts')
            <div class="d-block text-right">
                <a class="btn  btn-primary btn-sm py-1" data-href="{{ route('back.notifications.clear') }}" href="javascript:;">
                    <small>{{ __('Clear All') }}</small>
                </a>
            </div>
            @forelse(App\Models\Notification::orderby('id','desc')->get() as $notf)
            @if($notf->user_id != null)
                <div class="d-flex align-items-center">
                    <a class="btn btn-sm" href="{{route('back.notification.delete',$notf->id)}}">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="{{ route('back.user.show',$notf->user_id) }}">
                    <div class="mr-3">
                        <div class="icon-circle bg-primary">
                        <i class="fas fa-user text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">{{ $notf->created_at->diffForHumans() }}</div>
                        {{ __('A new user has registered.') }}
                    </div>
                    </a>
                </div>
                <br>
            @endif
            @if($notf->order_id != null)
                <div class="d-flex align-items-center">
                    <a class="btn btn-sm" href="{{route('back.notification.delete',$notf->id)}}">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="{{ route('back.order.invoice',$notf->order_id) }}">
                    <div class="mr-3">
                        <div class="icon-circle bg-success">
                        <i class="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">{{ $notf->created_at->diffForHumans() }}</div>
                        {{ __('You have recieved a new order.') }}
                    </div>
                    </a>
                </div>
                <br>
            @endif

            @empty
                <p>{{__('No Notifications')}}</p>
            @endforelse
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
			{{ __('You are going to delete this feature. All contents related with this feature will be lost.') }} {{ __('Do you want to delete it?') }}
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



