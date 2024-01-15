@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Edit Ticket') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.ticket.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card ">
				<div class="card-body">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-12">
								<form class="admin-form" action="{{ route('back.ticket.update',$ticket->id) }}" method="POST"
									enctype="multipart/form-data">
                                    @method('PUT')
                                    @csrf

									@include('alerts.alerts')

                                    <div class="mb-2">
                                        <div class="card">
                                            <div class="card-body d-flex flex-row justify-content-between ">
                                                <h4><span class="badge badge-primary text-white mr-2">{{$ticket->status}}</span> {{__('Subject :')}} {{$ticket->subject}}</h4>

                                                <div>
                                                    @if($ticket->file)
                                                <a href="{{asset('assets/files/'.$ticket->file)}}" title="Download" class="btn btn-primary btn-sm" download> {{__('Attachment')}}</a>
                                                @endif
                                                @if($ticket->status != 'Closed')
                                                <a href="{{ route('back.ticket.status',$ticket->id) }}" class="btn btn-primary btn-sm">{{__('Ticket Close')}}</a>
                                                @else
                                                    <span class="btn btn-danger btn-sm text-white">{{__('Closed')}}</span>
                                                @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    @if($ticket->messages->count() > 0)
                                    @foreach ($ticket->messages as $message)
                                        @if ($message->user_id == 0)
                                        <div class="card mb-3">
                                            <div class="card-body">
                                                <div class="media">
                                                    <div class="width-100 mr-3" >
                                                        {{__('Admin')}}
                                                    </div>
                                                    <div class="media-body">
                                                        <h6>{{__('Posted on')}} {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}</h6>
                                                        <p>{{$message->message}}</p>
                                                    </div>
                                                    </div>
                                            </div>
                                        </div>
                                        @else
                                        <div class="card mb-3">
                                            <div class="card-body">
                                                <div class="media">
                                                    <div class="width-100 mr-3" >
                                                        {{$ticket->user->first_name}}
                                                    </div>
                                                    <div class="media-body">
                                                        <h6>{{__('Posted on')}} {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}</h6>
                                                        <p>{{$message->message}}</p>
                                                    </div>
                                                    </div>
                                            </div>
                                        </div>
                                        @endif
                                    @endforeach
                                    @endif

                                        <input type="hidden" value="{{$ticket->id}}" name="ticket_id">
                                        @if($ticket->status != 'Closed')
                                        <div class="row">
                                            <div class="col-12 form-group">
                                                <label for="inputMessage">{{__('Message')}}</label>
                                                <textarea name="message" class="form-control"  id="inputMessage" placeholder="{{__('Message')}}" rows="6"></textarea>
                                            </div>
                                        </div>

                                        <div class=" mt-3">
                                            <button class="btn btn-primary" type="submit">{{__('Reply')}}</button>
                                        </div>
                                        @endif



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
