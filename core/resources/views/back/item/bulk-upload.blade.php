@extends('master.back')

@section('content')

<div class="container-fluid">

<!-- Page Heading -->
<div class="card mb-4">
    <div class="card-body">
        <div class="d-sm-flex align-items-center justify-content-between">
            <h3 class="mb-0 bc-title"><b>{{ __('Product CSV Import & Export') }}</b> </h3>
            <a class="btn btn-primary  btn-sm" href="{{route('back.item.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Go Items') }}</a>
        </div>
    </div>
</div>

<!-- Form -->
<div class="row">

<div class="col-xl-12 col-lg-12 col-md-12">

    <div class="card o-hidden border-0 shadow-lg">
        <div class="card-body pt4">
            <!-- Nested Row within Card Body -->
            <div class="row text-center">
                <div class="col-lg-12">
                    <form class="admin-form tab-form" action="{{ route('back.csv.import') }}" method="POST"enctype="multipart/form-data">
                        <input type="hidden" value="normal" name="item_type">
                        @csrf
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-left">
                                    <a class="btn btn-info btn-sm" href="{{route('back.csv.export')}}">{{__('Products CSV Export')}}</a>
                                </div>
                                <div class="text-right">
                             {{-- <a class="btn btn-info btn-sm" href="{{asset('assets/test_csv_file.csv')}}" download>{{__('Sample Csv Download')}}</a>--}}
                                    <a class="btn btn-info btn-sm" href="{{asset('assets/cinab_product_bulk_upload.csv')}}" download>{{__('Sample Csv Download')}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                @include('alerts.alerts')

                                <div class="form-group position-relative ">
                                    <label for="file">{{__('Upload Your CSV File')}}</label>
                                    <input type="file"  accept="csv" class="form-control" name="csv"
                                    id="file"  >

                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <button type="submit"
                                class="btn btn-secondary ">{{ __('Submit') }}</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</div>

</div>

</div>

@endsection
