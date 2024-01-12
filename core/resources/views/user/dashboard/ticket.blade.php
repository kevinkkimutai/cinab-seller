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
                <div class="mb-3">
                    <div class="card">
                        <div class="card-body d-flex flex-row justify-content-between align-items-center">
                            <h5 class="mb-0">{{ __('All Tickets') }}</h5>
                            <a href="{{ route('user.ticket.create') }}" class="btn btn-primary btn-sm"><span>{{__('Add New')}}</span></a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="u-table-res">
                            <table class="table table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th>{{__('Subject')}} #</th>
                                    <th>{{__('Status')}}</th>
                                    <th>{{__('Last Reply')}}</th>
                                    <th>{{__('Action')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                @forelse ($tickets as $ticket)
                                <tr>
                                    <td>{{$ticket->subject}}</td>
                                    <td>
                                        <span class="badge badge-primary">{{$ticket->status}}</span>
                                    </td>
                                    @if ($ticket->lastMessage)
                                    <td>{{ \Carbon\Carbon::parse($ticket->lastMessage->created_at)->diffForHumans() }}</td>
                                    @else
                                    <td> {{__('No Reply')}}</td>
                                    @endif
                                    <td>
                                        <a class="btn btn-info btn-sm" href="{{ route('user.ticket.view',$ticket->id) }}">
                                            <i class="fas fa-eye"> </i> {{__('View')}}
                                        </a>
                                        <a class="btn btn-sm btn-danger" href="{{ route('user.ticket.delete',$ticket->id) }}">
                                            <i class="fas fa-trash"> </i> {{__('Delete')}}
                                        </a>
                                    </td>
                                </tr>
                                @empty
                                    <tr class="text-center">
                                        <td colspan="4">{{__('Ticket Not Found')}}</td>
                                    </tr>
                                @endforelse

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
          </div>
    </div>
</div>
@endsection
