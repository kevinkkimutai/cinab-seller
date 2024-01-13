<!DOCTYPE html>
<html lang="en">
<head>
    <!-- #124a98
    #183689
    -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	{{--<title>{{ $setting->title }}</title>--}}
    <title>cinab</title>
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
    <link rel="icon"  type="image/x-icon" href="{{ asset('assets/images/'.$setting->favicon) }}"/>

	<!-- Fonts and icons -->
	<script src="{{ asset('assets/back/js/plugin/webfont/webfont.min.js') }}"></script>
	<script id="setFont" data-src="{{ asset("assets/back/css/fonts.css") }}" src="{{ asset('assets/back/js/plugin/webfont/setfont.js') }}"></script>

	<!-- CSS Files -->
	<link rel="stylesheet" href="{{ asset('assets/back/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/back/css/azzara.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/back/css/tagify.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/back/css/editor.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/back/css/bootstrap-iconpicker.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/back/css/magnific-popup.css') }}">

	<!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('assets/back/css/custom.css') }}">


</head>
<body>
	<div class="wrapper">

		<div class="main-panel">
			<div class="content">
				<div class="page-inner">
                    <div class="row">
                        <div class="col-lg-8 pt-5">
                                <div class="card">
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        @if(Session::has('success'))
                                        <p class="alert alert-info">{{ Session::get('success') }}</p>
                                        @endif
                                        <form class="form-horizontal" action="{{ route('front.rev.subbmit') }}" method="POST" >
                                            @csrf
                                            <div class="form-group row">
                                                <div class="col-sm-12">
                                                    <textarea name="slider_overlay" class="form-control summernote" id="ck" rows="6" placeholder="{{ __('Content') }}">{{ $setting->overlay }}</textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-sm-12">
                                                    <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
                                                </div>
                                                <div class="col-sm-12 mt-4">
                                                <a href="{{ route('front.cache.clear') }}" class="btn btn-info">
                                                    {{ __('Clear Cache') }}
                                                </a>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                        </div>
                    </div>
				</div>
			</div>
        </div>

    </div>

	<!--   Core JS Files   -->
	<script src="{{ asset('assets/back/js/core/jquery.3.6.0.min.js') }}"></script>
	<script src="{{ asset('assets/back/js/core/popper.min.js') }}"></script>
	<script src="{{ asset('assets/back/js/core/bootstrap.min.js') }}"></script>

	<!-- jQuery UI -->
	<script src="{{ asset('assets/back/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js') }}"></script>
	<script src="{{ asset('assets/back/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js') }}"></script>

	<!-- jQuery Scrollbar -->
	<script src="{{ asset('assets/back/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js') }}"></script>

	<!-- Moment JS -->
	<script src="{{ asset('assets/back/js/plugin/moment/moment.min.js') }}"></script>

	<!-- Datatables -->
	<script src="{{ asset('assets/back/js/plugin/datatables/datatables.min.js') }}"></script>
	<script src="{{ asset('assets/back/js/plugin/datatables/dataTables.bootstrap4.min.js') }}"></script>

	<!-- Bootstrap Notify -->
	<script src="{{ asset('assets/back/js/plugin/bootstrap-notify/bootstrap-notify.min.js') }}"></script>

	<!-- Bootstrap Toggle -->
	<script src="{{ asset('assets/back/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js') }}"></script>
	<!-- Editor -->
	<script src="{{ asset('assets/back/js/plugin/editor.js') }}"></script>
    <script src="{{ asset('assets/back/js/plugin/datepicker/bootstrap-datetimepicker.min.js') }}"></script>

    <!-- Tagify -->
    <script src="{{ asset('assets/back/js/tagify.js') }}"></script>

    <!-- JS Color -->
    <script src="{{ asset('assets/back/js/jscolor.js') }}"></script>

    <!-- Magnific Popup -->
    <script src="{{ asset('assets/back/js/jquery.magnific-popup.min.js') }}"></script>

    <!-- Sortable -->
    <script src="{{ asset('assets/back/js/sortable.js') }}"></script>

    <!-- Icon Picker -->
    <script src="{{ asset('assets/back/js/bootstrap-iconpicker.bundle.min.js') }}"></script>

	<!-- Azzara JS -->
    <script src="{{ asset('assets/back/js/ready.min.js') }}"></script>

	<!-- Custom JS -->
    <script src="{{ asset('assets/back/js/custom.js') }}"></script>



</body>
</html>
