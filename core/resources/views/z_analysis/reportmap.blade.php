<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
{{--<script src="{{asset('javascriptfiles/googlemaps.js')}}"></script>--}}
<script>

    window.onload = function () {
        var startDate = document.getElementById('startingDate').value;
        var endDate = document.getElementById('endingDate').value;
        getLocationsData(startDate,endDate);
    }

    function getLocationsData(startDate,endDate){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url:"/getLocationData",
            data:{startDate:startDate,endDate:endDate},
            method:"POST",
            cache:false,
            success:function(data) {
                LoadMap(data);
            }
        });
    }


    function LoadMap(markers) {
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(-1.23444,36.7456 ),
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
    <script>

        function getDataDated(){
            var startDate = document.getElementById('startingDate').value;
            var endDate = document.getElementById('endingDate').value;
            if(startDate !="" && endDate !=""){
                location.href ="/reportmap/"+startDate+"/"+endDate;
            }
        }
    </script>
    <div class="container-fluid">
    <!-- Content Row -->
    @if (Auth::guard('admin')->user()->id == 1)
        <!-- Content Row -->
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div  class="row">
                                <div class="col-md-6">
                                    <div class="card-title">{{__('Users Location')}}</div>
                                </div>
                                <div class="col-md-2">
                                    <label>Starting Date</label>
                                    <input class="form-control" value="{{$startDate}}" placeholder="Start Date" type="date" id="startingDate">
                                </div>
                                <div class="col-md-2">
                                    <label>Ending Date</label>
                                    <input class="form-control"  value="{{$endDate}}" placeholder="End Date" type="date" id="endingDate">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-sussess " onclick ="getDataDated()" style="margin-top: 20px">Get</button>
                                </div>
                            </div>
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

    </div>


@endsection







