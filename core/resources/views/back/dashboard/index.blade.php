@extends('master.back')

@section('content')

<div class="container-fluid">

    <!-- Page Heading -->

  {{--  @if(session()->has('multipledomain'))
        <div class="alert alert-danger" style="background-color: #FFE4E4;" id="license_alert">
            <strong>One Purchase Code Use in multiple domain :</strong>-
            @foreach (session()->get('multipledomain') as $item)
                <p style="margin-bottom: 0px;color: #155724;">{{ $item }}</p>
            @endforeach
            <hr>
            <strong>
                {{ __('Envato not allow to install script multiple domin using one purchase code. ') }}
                <br>
                {{ __('One purched codes for one Domin.
                Author can take action any time for that.') }}
                <br>
                <hr>
                {{ __('Author Contact : geniusdevs24@gmail.com') }}
            </strong>
        </div>
    @endif--}}

    <div class="card mb-4">
        <h3 class="mb-0 px-3 py-4"><b>{{ __('Dashboard') }}</b></h3>
    </div>


    @include('alerts.alerts')
  <!-- Content Row -->
    @if (Auth::guard('admin')->user()->id == 1)
        <div class="row">

    <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-success bubble-shadow-small">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Orders') }}</b></p>
                            <h4 class="card-title">{{ $totalOrders }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-success bubble-shadow-small">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Pending Orders') }}</b></p>
                            <h4 class="card-title">{{ $totalPendingOrders }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-success bubble-shadow-small">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Delivered Orders') }}</b></p>
                            <h4 class="card-title">{{$totalDeliveredOrders}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-success bubble-shadow-small">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Canceled Orders') }}</b></p>
                            <h4 class="card-title">{{$totalCanceledOrders}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-secondary  bubble-shadow-small">
                            <i class="far fa-chart-bar"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Product Sale') }}</b></p>
                            <h4 class="card-title">{{$totalProductSale}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-secondary  bubble-shadow-small">
                            <i class="far fa-chart-bar"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Today Product Order') }}</b></p>
                            <h4 class="card-title">{{$totalTodayProductSale}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-secondary  bubble-shadow-small">
                            <i class="far fa-chart-bar"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('This Month Sale') }}</b></p>
                            <h4 class="card-title">{{$totalCurrentMonthProductSale}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-secondary  bubble-shadow-small">
                            <i class="far fa-chart-bar"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('This Year Product Sale') }}</b></p>
                            <h4 class="card-title">{{$totalLatYearProductSale}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-danger  bubble-shadow-small">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Earning') }}</b></p>
                            <h4 class="card-title">{{$totalEarning}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>



      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-danger  bubble-shadow-small">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Today Pending Earning') }}</b></p>
                            <h4 class="card-title">{{$totalTodayEarning}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-danger  bubble-shadow-small">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('This Month Earning') }}</b></p>
                            <h4 class="card-title">{{$totalMonthEarning}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-danger  bubble-shadow-small">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('This Year Erning') }}</b></p>
                            <h4 class="card-title">{{$totalYearEarning}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>



        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6">
            <div class="card card-stats card-round">
                <div class="card-body ">
                    <div class="row align-items-center">
                        <div class="col-icon">
                            <div class="icon-big text-center icon-info bubble-shadow-small">
                                <i class="far fa-check-circle"></i>
                            </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                            <div class="numbers">
                                <p class="mb-0"><b>{{ __('Total Products') }}</b></p>
                                <h4 class="card-title">{{ $totalItems }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Customers') }}</b></p>
                            <h4 class="card-title">{{ $totalUsers }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>


      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Categories') }}</b></p>
                            <h4 class="card-title">{{ $totalCategory }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Brands') }}</b></p>
                            <h4 class="card-title">{{ $totalBrand }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Reviews') }}</b></p>
                            <h4 class="card-title">{{ $totalReview }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Transactions') }}</b></p>
                            <h4 class="card-title">{{ $totalTransaction }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>


      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Tickets') }}</b></p>
                            <h4 class="card-title">{{ $totalTicket }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>



      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Pending Tickets') }}</b></p>
                            <h4 class="card-title">{{ $totalPendingTicket }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Open Tickets') }}</b></p>
                            <h4 class="card-title">{{ $totalTicket }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>


      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Blogs') }}</b></p>
                            <h4 class="card-title">{{ $totalBlog }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total Subscribers') }}</b></p>
                            <h4 class="card-title">{{ $totalSubscriber }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card card-stats card-round">
            <div class="card-body ">
                <div class="row align-items-center">
                    <div class="col-icon">
                        <div class="icon-big text-center icon-info  bubble-shadow-small">
                            <i class="far fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="col col-stats ml-3 ml-sm-0">
                        <div class="numbers">
                            <p class="mb-0"><b>{{ __('Total System User') }}</b></p>
                            <h4 class="card-title">{{$totalSystemUserEarning}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
          <div class="card card-stats card-round">
              <div class="card-body ">
                  <div class="row align-items-center">
                      <div class="col-icon">
                          <div class="icon-big text-center icon-danger  bubble-shadow-small">
                              <i class="fas fa-users"></i>
                          </div>
                      </div>
                      <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                              <p class="mb-0"><b>{{ __('Total Venodor') }}</b></p>
                              <h4 class="card-title">0</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div class="col-xl-3 col-md-6">
          <div class="card card-stats card-round">
              <div class="card-body ">
                  <div class="row align-items-center">
                      <div class="col-icon">
                          <div class="icon-big text-center icon-danger  bubble-shadow-small">
                              <i class="fas fa-users"></i>
                          </div>
                      </div>
                      <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                              <p class="mb-0"><b>{{ __('Approved Vendors') }}</b></p>
                              <h4 class="card-title">0</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6">
          <div class="card card-stats card-round">
              <div class="card-body ">
                  <div class="row align-items-center">
                      <div class="col-icon">
                          <div class="icon-big text-center icon-danger  bubble-shadow-small">
                              <i class="fas fa-users"></i>
                          </div>
                      </div>
                      <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                              <p class="mb-0"><b>{{ __('Vendors Awaiting Approval') }}</b></p>
                              <h4 class="card-title">0</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-xl-3 col-md-6">
          <div class="card card-stats card-round">
              <div class="card-body ">
                  <div class="row align-items-center">
                      <div class="col-icon">
                          <div class="icon-big text-center icon-danger  bubble-shadow-small">
                              <i class="fa fa-trash"></i>
                          </div>
                      </div>
                      <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                              <p class="mb-0"><b>{{ __('Cancelled Vendors') }}</b></p>
                              <h4 class="card-title">0</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


  </div>
  <!-- Content Row -->
  <div class="row">

        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">{{__('Monthly Product Sales Report')}} </div>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas id="multipleLineChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="card-title">{{__('Monthly Earnings Report')}} </div>
            </div>
            <div class="card-body">
                <div class="chart-container">
                    <canvas id="multipleLineChart2"></canvas>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-title">{{__('Recent Orders')}}</div>
            </div>
            <div class="card-body pb-0">
                <div class="card-body">
                    @if ($recentOrders->count() > 0)
                      <div class="gd-responsive-table">
                          <table class="table table-bordered table-striped" id="recent-orders" width="100%" cellspacing="0">
                          <thead>
                              <th>{{ __('Customer') }}</th>
                              <th>{{ __('Order ID') }}</th>
                              <th>{{ __('Payment Method') }}</th>
                              <th>{{ __('Total') }}</th>
                          </thead>
                          <tbody>
                              @foreach($recentOrders as $data)
                              <tr>
                                  <td>
                                      <a href="{{route('back.user.show',$data->user_id)}}">{{ $data->user->displayName()}}</a>
                                  </td>
                                  <td>
                                      <a href="{{route('back.order.invoice',$data->id)}}">{{ $data->transaction_number}}</a>
                                  </td>
                                  <td>
                                      {{ $data->payment_method}}
                                  </td>
                                  <td>
                                      {{$data->currency_sign}}{{PriceHelper::OrderTotal($data)}}
                                  </td>
                              </tr>
                              @endforeach
                          </tbody>
                          </table>
                      </div>

                      @else
                      <p class="d-block text-center">
                          {{ __('No Order Found') }}
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

@section('scripts')
<script>

    multipleLineChart = document.getElementById('multipleLineChart').getContext('2d'),
    multipleLineChart2 = document.getElementById('multipleLineChart2').getContext('2d')


        var myMultipleLineChart = new Chart(multipleLineChart, {
			type: 'line',
			data: {
				labels: [{!! $order_days !!}],
				datasets: [{
					label: "Product Sales",
					borderColor: "#1d7af3",
					pointBorderColor: "#FFF",
					pointBackgroundColor: "#1d7af3",
					pointBorderWidth: 2,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 1,
					pointRadius: 4,
					backgroundColor: 'transparent',
					fill: true,
					borderWidth: 2,
					data: [{!! $order_sales !!}]
				}]
			},
			options : {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				tooltips: {
					bodySpacing: 4,
					mode:"nearest",
					intersect: 0,
					position:"nearest",
					xPadding:10,
					yPadding:10,
					caretPadding:10
				},
				layout:{
					padding:{left:15,right:15,top:15,bottom:15}
				}
			}
		});

        var myMultipleLineChart2 = new Chart(multipleLineChart2, {
			type: 'line',
			data: {
				labels: [{!! $earning_days !!}],
				datasets: [ {
					label: "Earning"+' {{PriceHelper::adminCurrency()}}',
					borderColor: "#f3545d",
					pointBorderColor: "#FFF",
					pointBackgroundColor: "#f3545d",
					pointBorderWidth: 2,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 1,
					pointRadius: 4,
					backgroundColor: 'transparent',
					fill: true,
					borderWidth: 2,
					data: [{!!$total_incomess!!}]
				}]
			},
			options : {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				tooltips: {
					bodySpacing: 4,
					mode:"nearest",
					intersect: 0,
					position:"nearest",
					xPadding:10,
					yPadding:10,
					caretPadding:10
				},
				layout:{
					padding:{left:15,right:15,top:15,bottom:15}
				}
			}
		});


</script>
@endsection






