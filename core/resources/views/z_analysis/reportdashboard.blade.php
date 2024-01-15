@extends('master.back')

@section('content')

    <div class="container-fluid">

        <div class="card mb-4">
            <h3 class="mb-0 px-3 py-4"><b>{{ __('Reports For Today ').date("Y-m-d") }}</b></h3>
        </div>


        @include('alerts.alerts')
    <!-- Content Row -->
        @if (Auth::guard('admin')->user()->id == 1)
            <!-- Content Row -->
            <div class="row">
                 <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">{{__('Recent Access')}}</div>
                        </div>
                        <div class="card-body pb-0">
                            <div class="card-body">
                                @if (count($pagesAccessed) > 0)
                                    <div class="gd-responsive-table">
                                        <table class="table table-bordered table-striped" id="recent-orders" width="100%" cellspacing="0">
                                            <thead>
                                            <th>{{ __('IP Address') }}</th>
                                            <th>{{ __('Country') }}</th>
                                            <th>{{ __('Location') }}</th>
                                            <th>{{ __('Time') }}</th>
                                            <th>{{ __('Device Used') }}</th>
                                            <th>{{ __('Browser Used') }}</th>
                                            <th>{{ __('Page Visited') }}</th>
                                            <th>{{ __('Action') }}</th>
                                            </thead>
                                            <tbody>

                                            @foreach($pagesAccessed as $data)
                                                <tr>
                                                    <td>
                                                        {{ $data['ipAddress']}}
                                                    </td>
                                                    <td>
                                                        {{ $data['countryName']."(".$data['countryCode'].")"}}
                                                    </td>
                                                    <td>
                                                        <a href="{{route('z_analysis.reportusermap',$data['id'])}}">{{ $data['latitude'] .",". $data['longitude']}}</a>
                                                    </td>
                                                    <td>
                                                        {{ $data['accessedTime']}}
                                                    </td>
                                                    <td>
                                                        {{ $data['deviceUsed']}}
                                                    </td>
                                                    <td>
                                                        {{ $data['browser']}}
                                                    </td>
                                                    {{--<td>
                                                        <a href="{{route('back.order.invoice',$data->id)}}">{{ $data->transaction_number}}</a>
                                                    </td>--}}
                                                    <td>
                                                        <a href="{{route('z_analysis.reportmap',$data['id'])}}">{{ $data['pagevisited']}}</a>
                                                    </td>
                                                    <td>
                                                       <a href="{{route('z_analysis.track',$data['id'])}}">Track</a>
                                                    </td>
                                                </tr>
                                            @endforeach
                                            </tbody>
                                        </table>
                                    </div>

                                @else
                                    <p class="d-block text-center">
                                        {{ __('No Data Found') }}
                                    </p>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        @endif
    </div>


@endsection







