@extends('master.front')
@section('title')
    {{__('Dashboard')}}
@endsection
@section('content')

<!-- Page Title-->
<div class="page-title">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumbs">
                    <li><a href="{{__('front.index')}}">{{__('Home')}}</a> </li>
                    <li class="separator"></li>
                    <li>{{__('Tickets')}} </li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1">
  <div class="row">
         @include('includes.user_sitebar')
          <div class="col-lg-8">
            <div class="padding-top-2x mt-2 hidden-lg-up"></div>
            <div class="mb-2">
                <div class="card">
                    <div class="card-body d-flex flex-row justify-content-between align-items-center">
                        <p class="mb-0"><span class="badge badge-primary">{{$ticket->status}}</span> {{__('Subject :')}} {{$ticket->subject}}</p>
                        <a href="{{ route('user.ticket') }}" class="btn btn-primary btn-sm">{{__('Back')}}</a>
                        @if($ticket->file)
                        <a href="{{asset('assets/files/'.$ticket->file)}}" title="Download" class="btn btn-primary btn-sm" download> {{__('Attachment')}}</a>
                        @endif
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
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
                                        <small><span>{{__('Posted on')}} {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}</span></small>
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
                                        {{__('Me')}}
                                    </div>
                                    <div class="media-body">
                                        <small><span>{{__('Posted on')}} {{ \Carbon\Carbon::parse($message->created_at)->diffForHumans() }}</span></small>
                                      <p>{{$message->message}}</p>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        @endif
                    @endforeach
                    @endif
                    @if($ticket->status != 'Closed')
                    <form action="{{route('user.ticket.reply')}}" method="post" enctype="multipart/form-data" class="contact-form">
                        @csrf
                        <input type="hidden" value="{{$ticket->id}}" name="ticket_id">
                        <div class="row">
                            <div class="col-12 form-group">
                                <label for="inputMessage">{{__('Message')}} *</label>
                                <textarea name="message" class="form-control" id="inputMessage" placeholder="{{__('Message')}}" rows="6"></textarea>
                            @error('message')
                                <p class="text-danger">{{$message}}</p>
                            @enderror
                            </div>
                        </div>

                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-primary btn-sm" type="submit"><span>{{__('Reply')}}</span></button>
                        </div>
                    </form>
                    @endif
                </div>
            </div>

          </div>
        </div>
  </div>
@endsection
