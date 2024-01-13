<?php
use App\Http\Controllers\zAnalysis\generalController;
?>
@extends('master.back')

@section('content')

    <script>

        function getDataDated(){
            var startDate = document.getElementById('startingDate').value;
            var endDate = document.getElementById('endingDate').value;
            if(startDate !="" && endDate !=""){
               location.href ="/pagesvisited/"+startDate+"/"+endDate;
            }
        }


    </script>
    <div class="container-fluid">

        <div class="card mb-4">
           <div  class="row">
               <div class="col-md-6">
                   <h3 class="mb-0 px-3 py-4"><b>{{ __('Page  Access ') }}</b></h3>
               </div>
               <div class="col-md-2">
                   <label>Starting Date</label>
                   <input class="form-control" placeholder="Start Date" type="date" id="startingDate">
               </div>
               <div class="col-md-2">
                   <label>Ending Date</label>
                   <input class="form-control"  placeholder="End Date" type="date" id="endingDate">
               </div>
               <div class="col-md-2">
                   <button class="btn btn-sussess " onclick ="getDataDated()" style="margin-top: 20px">Get</button>
               </div>
           </div>
        </div>


    @include('alerts.alerts')
    <!-- Content Row -->
    @if (Auth::guard('admin')->user()->id == 1)
        <!-- Content Row -->
            <div class="card-body">
                <div class="row">
                    @if (count($pageVisited) > 0)
                        @foreach($pageVisited as $data)
                            <div class="col-xl-3 col-md-6">
                                <div class="card card-stats card-round">
                                    <div class="card-body ">
                                        <div class="row align-items-center">
                                            <div class="col-icon">
                                                <div class="icon-big text-center icon-info bubble-shadow-small" >
                                                    <i class="fas fa-flag"></i>
                                                </div>
                                            </div>
                                            <div class="col col-stats ml-3 ml-sm-0">
                                                <div class="numbers">
                                                    <p class="mb-0"><b>{{$data['pagevisited']}}</b></p>
                                                    <h4 class="card-title">{{generalController::countPageVisited($data['pagevisited'],$startDate,$endDate)}}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach

                    @else
                        <p class="d-block text-center">
                            {{ __('No Data Found') }}
                        </p>
                    @endif
                </div>
            </div>

    </div>

    @endif
    </div>


@endsection







