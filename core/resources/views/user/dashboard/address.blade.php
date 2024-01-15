@extends('master.front')
@section('title')
    {{__('Address')}}
@endsection
@section('content')

    <!-- Page Title-->
<div class="page-title">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumbs">
                    <li><a href="{{route('front.index')}}">{{__('Home')}}</a> </li>
                    <li class="separator"></li>
                    <li>{{__('Shipping - Billing Address')}}</li>
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
          <div class="card">
              <div class="card-body">
                <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                <h5>{{__('Billing Address')}}</h5>
                <form id="billingForm" class="row" action="{{route('user.billing.submit')}}" method="POST">
                  @csrf
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-address1">{{__('Address 1')}} *</label>
                         <input class="form-control" type="text" name="bill_address1" id="billing-address1" value="{{$user->bill_address1}}">
                      @error('bill_address1')
                      <p class="text-danger">{{$message}}</p>
                      @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-address2">{{__('Address 2')}}</label>
                         <input class="form-control" type="text" name="bill_address2" value="{{$user->bill_address2}}" id="billing-address2">
                         @error('bill_address2')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-zip">{{__('Zip Code')}}</label>
                         <input class="form-control" type="text" name="bill_zip" id="billing-zip" value="{{$user->bill_zip}}">
                         @error('bill_zip')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-company">{{__('City')}} *</label>
                         <input class="form-control" type="text" name="bill_city" id="billing-city" value="{{$user->bill_city}}">
                         @error('bill_city')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-company">{{__('Company')}}</label>
                         <input class="form-control" type="text" name="bill_company" id="billing-company" value="{{$user->bill_company}}">
                         @error('bill_company')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="billing-country">{{__('Country')}}</label>
                         <select class="form-control" name="bill_country" id="billing-country">
                          <option selected>{{__('Choose Country')}}</option>
                          @foreach (DB::table('countries')->get() as $country)
                          <option value="{{$country->name}}" {{$user->bill_country == $country->name ? 'selected' :''}} >{{$country->name}}</option>
                          @endforeach
                         </select>
                     @error('bill_country')
                      <p class="text-danger">{{$message}}</p>
                      @endif
                      </div>
                   </div>
                   <div class="col-12 ">
                      <div class="text-right">
                         <button class="btn btn-primary margin-bottom-none  btn-sm" type="submit"><span>{{__('Update Address')}}</span></button>
                      </div>
                   </div>
                </form>
                <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                <br>
                <h5>{{__('Shipping Address')}}</h5>
                <form id="shippingForm" class="row" action="{{route('user.shipping.submit')}}" method="POST">
                  @csrf
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="shipping-address1">{{__('Address 1')}} *</label>
                         <input class="form-control" name="ship_address1" value="{{$user->ship_address1}}" type="text" id="shipping-address1">
                         @error('ship_address1')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="shipping-address2">{{__('Address 2')}} </label>
                         <input class="form-control" value="{{$user->ship_address2}}" name="ship_address2" type="text" id="shipping-address2">
                         @error('ship_address2')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="shipping-zip">{{__('Zip Code')}}</label>
                         <input class="form-control" type="text" value="{{$user->ship_zip}}" name="ship_zip" id="shipping-zip">
                         @error('ship_zip')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="shipping-company">{{__('City')}} *</label>
                         <input class="form-control" type="text" name="ship_city" id="shippingcity" value="{{$user->ship_city}}">
                         @error('ship_city')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                         <label for="shipping-company">{{__('Company')}}</label>
                         <input class="form-control" type="text" name="ship_company" id="shipping-company" value="{{$user->ship_company}}">
                         @error('ship_company')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                        </div>
                   </div>
                   @if (DB::table('states')->count() > 0)
                   <div class="col-md-6">
                     <div class="form-group">
                        <label for="state_id">{{__('State')}} <small>({{__('include tax')}})</small> </label>
                        <select class="form-control" name="state_id" id="state_id">
                         <option value="" selected>{{__('Select Shipping State')}}</option>
                         @foreach (DB::table('states')->whereStatus(1)->get() as $state)
                         <option value="{{$state->id}}" {{$user->state_id == $state->id ? 'selected' :''}} >{{$state->name}}</option>
                         @endforeach
                        </select>
                    @error('state_id')
                     <p class="text-danger">{{$message}}</p>
                     @endif
                     </div>
                  </div>
                   @endif
             
                   <div class="{{DB::table('states')->count() > 0  ? 'col-md-12' : 'col-md-6'}} ">
                      <div class="form-group">
                         <label for="shipping-country">{{__('Country')}}</label>
                         <select class="form-control" name="ship_country" id="shipping-country">
                            <option>{{__('Choose Country')}}</option>
                            @foreach (DB::table('countries')->get() as $country)
                            <option value="{{$country->name}}" {{$user->ship_country == $country->name ? 'selected' :''}} >{{$country->name}}</option>
                            @endforeach
                         </select>
                         @error('ship_country')
                         <p class="text-danger">{{$message}}</p>
                         @endif
                      </div>
                   </div>
                   <div class="col-12 ">
                      <div class="text-right">
                         <button class="btn btn-primary margin-bottom-none btn-sm" type="submit"><span>{{__('Update Address')}}</span></button>
                      </div>
                   </div>
                </form>
              </div>
          </div>
       </div>
    </div>
 </div>
@endsection
