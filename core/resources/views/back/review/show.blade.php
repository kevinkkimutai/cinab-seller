@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0"><b>{{ __('Review Details') }}</b></h3>
                <a class="btn btn-primary  btn-sm" href="{{route('back.review.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body p-5">
					<!-- Nested Row within Card Body -->
                    <div class="table-responsive dashboard-table">
                        <table class="table">
                            <tr>
                                <th>{{ __("First Name") }}</th>
                                <td>{{$review->user->first_name}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Last Name") }}</th>
                                <td>{{$review->user->last_name}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Email Address") }}</th>
                                <td>{{$review->user->email}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Phone Number") }}</th>
                                <td>{{$review->user->phone}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Country Name") }}</th>
                                <td>{{$review->user->country}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Rating") }}</th>
                                <td>{{$review->rating}}</td>
                            </tr>
                            <tr>
                                <th>{{ __("Review") }}</th>
                                <td>{{$review->review}}</td>
                            </tr>
                        </table>
                    </div>
				</div>
			</div>

		</div>

	</div>

</div>

@endsection
