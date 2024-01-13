@extends('master.back')
@section('styles')
    <link rel="stylesheet" href="{{asset('assets/back/css/select2.css')}}">
    <link rel="stylesheet" href="{{asset('assets/back/css/datepicker.css')}}">
@endsection
@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class="mb-0 bc-title"><b>{{ __('Campaign Offer') }}</b></h3>
                </div>
        </div>
    </div>

    {{-- Create Table Btn --}}

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body">
            @include('alerts.alerts')
            <form action="{{route('back.setting.update')}}" method="POST">
                @csrf

                <div class="row">
                    
                    <div class="col-md-5">
                        <div class="form-group product-serch">
                            <label for="name">{{ __('Campaign Title') }} *</label>
                            <input type="text" required class="form-control" name="campaign_title" value="{{$setting->campaign_title}}" placeholder="{{__('Campaign Section Title')}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group product-serch">
                            <label for="name">{{ __('Campaign Last Date Time') }} *</label>
                            <input type="text" required class="form-control" name="campaign_end_date" value="{{$setting->campaign_end_date}}" placeholder="{{__('Enter Date')}}" id="datepicker">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group product-serch">
                            <label for="campaign_status">{{ __('Status') }} *</label>
                            <select name="campaign_status" class="form-control" id="campaign_status">
                                <option value="1" {{$setting->campaign_status == 1 ? 'selected' : ''}} >{{ __('Publish') }}</option>
                                <option value="2" {{$setting->campaign_status == 2 ? 'selected' : ''}}>{{ __('Unpublish') }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">{{__('Save')}}</button>
                        </div>
                    </div>
                </div>
            </form>
		</div>
	</div>

	<div class="card shadow mb-4">
        <div class="card-header">
            <h4 class="card-title">{{__('Product Added for Campaign')}}</h4>
            <div class="row">
                <form action="{{route('back.campaign.store')}}" method="POST">
                    @csrf
                    <div class="col-md-6">
                        <div class="form-group ">
                            <select id="basic" name="item_id" class="form-control" >
                                <option value="" disabled selected>{{__('Select Product')}}</option>
                                @foreach ($datas as $item)
                                    <option value="{{$item->id}}">{{$item->name}}</option>
                                @endforeach
                            </select>
                            @error('item_id')
                                <p class="text-danger">{{$message}}</p>
                            @endif
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">{{__('Add To Campaign')}}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
       
		<div class="card-body">

            <table class="table table-bordered table-striped" id="admin-table" width="100%" cellspacing="0">

                <thead>
                    <tr>
                        <th>{{ __('Image') }}</th>
                        <th width="40%">{{ __('Name') }}</th>
                        <th>{{ __('Price') }}</th>
                        <th>{{ __('Status') }}</th>
                        <th>{{ __('Show Home Page') }}</th>
                        <th>{{ __('Action') }}</th>
                    </tr>
                </thead>

                <tbody>
                    @if ($items->count() > 0)
                      @foreach ($items as $data)
                          <tr>
                              <td><img src="{{asset('assets/images/'.$data->item->photo)}}" alt=""></td>
                              <td>{{$data->item->name}}</td>
                              <td> {{ PriceHelper::adminCurrencyPrice($data->item->discount_price) }}</td>
                              <td>
                                <div class="dropdown">
                                    <button class="btn btn-{{  $data->status == 1 ? 'success' : 'danger'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      {{  $data->status == 1 ? __('Publish') : __('Unpublish')  }}
                                    </button>
                                    <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                                      <a class="dropdown-item" href="{{ route('back.campaign.status',[$data->id,1,'status']) }}">{{ __('Publish') }}</a>
                                      <a class="dropdown-item" href="{{ route('back.campaign.status',[$data->id,0,'status']) }}">{{ __('Unpublish') }}</a>
                                    </div>
                                  </div>
                            </td>
                              <td>
                                <div class="dropdown">
                                    <button class="btn btn-{{  $data->is_feature == 1 ? 'success' : 'danger'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      {{  $data->is_feature == 1 ? __('Active') : __('Deactive')  }}
                                    </button>
                                    <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                                      <a class="dropdown-item" href="{{ route('back.campaign.status',[$data->id,1,'is_feature']) }}">{{ __('Active') }}</a>
                                      <a class="dropdown-item" href="{{ route('back.campaign.status',[$data->id,0,'is_feature']) }}">{{ __('Deactive') }}</a>
                                    </div>
                                  </div>
                            </td>
                              <td>
                                <a class="btn btn-danger btn-sm " data-toggle="modal"
                                    data-target="#confirm-delete" href="javascript:;"
                                    data-href="{{ route('back.campaign.destroy',$data->id) }}">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                          </tr>
                      @endforeach
                    @else
                    <p class="d-block text-center">
                        {{ __('No Product Found') }}
                    </p>
                    @endif
                   
                    
                </tbody>

            </table>
		</div>
	</div>

</div>

</div>
<!-- End of Main Content -->
{{-- DELETE MODAL --}}

<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="confirm-deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

		<!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ __('Confirm Delete?') }}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
		</div>

		<!-- Modal Body -->
        <div class="modal-body">
			{{ __('You are going to delete this item. All contents related with this item will be lost.') }} {{ __('Do you want to delete it?') }}
		</div>

		<!-- Modal footer -->
        <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Cancel') }}</button>
			<form action="" class="d-inline btn-ok" method="POST">

                @csrf

                @method('DELETE')

                <button type="submit" class="btn btn-danger">{{ __('Delete') }}</button>

			</form>
		</div>

      </div>
    </div>
  </div>

{{-- DELETE MODAL ENDS --}}



@endsection
@section('scripts')
    <script type="" src="{{asset('assets/back/js/select2.js')}}"></script>
    <script>
        $('#basic').select2({
			theme: "bootstrap"
		});
    </script>
@endsection