<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
{{--<script src="{{asset('javascriptfiles/googlemaps.js')}}"></script>--}}
<script>

    window.onload = function () {
        //alert("====>> ");
        var accessID = document.getElementById("accessID").value;
        var lng = document.getElementById("lng").value;
        var lat = document.getElementById("lat").value;
        //alert("====>> "+accessID);
        getLocationsData(accessID,lat,lng);
    }

    function getLocationsData(accessID,lat,lng){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url:"/getuserLocationData",
            method:"POST",
            data:{id:accessID},
            cache:false,
            success:function(data) {
                LoadMap(data,lat,lng);
            }
        });
    }


    function LoadMap(markers,lat,lng) {
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(lat,lng ),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

        var infoWindow = new google.maps.InfoWindow();

        for (var i = 0; i < markers.length; i++) {
            var data = markers[i];
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });

            //Attach click event to the marker.
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }

    }

</script>

@extends('master.back')

@section('content')

    <div class="container-fluid">

        <input value="{{$accessID}}" id="accessID" type="hidden">
        <input value="{{$lng}}" id="lng" type="hidden">
        <input value="{{$lat}}" id="lat" type="hidden">
        <div class="card mb-4">
            <h3 class="mb-0 px-3 py-4"><b>{{ __('User location and pages visited') }}</b></h3>
        </div>


    @include('alerts.alerts')
    <!-- Content Row -->
    @if (Auth::guard('admin')->user()->id == 1)
        <!-- Content Row -->
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">{{__('User Location')}}</div>
                        </div>
                        <div class="card-body pb-0">
                            <div class="card-body">
                                <div id="dvMap" style="width: 100%; height: 700px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

    @endif


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
                                                        <a href="{{route('z_analysis.reportmap',$data['id'])}}">{{ $data['latitude'] .",". $data['longitude']}}</a>
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







