@extends('master.front')
@section('title')
    {{__('Invoice')}}
@endsection
@section('content')

<!-- Page Title-->
<div class="page-title">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumbs">
                    <li><a href="{{route('user.order.index')}}">{{__('Orders')}}</a> </li>
                    <li class="separator"></li>
                    <li>{{__('Order Invoice')}}</li>
                  </ul>
            </div>
        </div>
    </div>
  </div>
  @php
  if($order->state){
      $state = json_decode($order->state,true);
  }else{
      $state = [];
  }
@endphp
        <!-- Page Content-->
  <div class="container padding-bottom-3x mb-1 print_invoice">
    <div class="card card-body p-5">
                <div class="row">
                    <div class="col-lg-12">
                        <a href="{{route('user.order.index')}}" class="btn btn-sm btn-primary d-inline-block"><span>{{__('Back')}}</span></a>
                        <a href="{{route('user.order.print',$order->id)}}" target="_blank" class="btn btn-sm btn-primary invoice_price d-inline-block"><span>{{__('Print')}}</span></a>
                    </div>
                </div> <!-- / .row -->
                <div class="row">
                  <div class="col text-center">

                    <!-- Logo -->
                    <img class="img-fluid mb-5 mh-70"  alt="Logo" src="{{asset('assets/images/'.$setting->logo)}}">

                  </div>
                </div> <!-- / .row -->
                <div class="row">
                  <div class="col-12">
                      <h5><b>{{__('Order Details :')}}</b></h5>

                      <span class="text-muted">{{__('Transaction Id :')}}</span>{{$order->txnid}}<br>
                      <span class="text-muted">{{__('Order Id :')}}</span>{{$order->transaction_number}}<br>
                      <span class="text-muted">{{__('Order Date :')}}</span>{{$order->created_at->format('M d, Y')}}<br>
                      <span class="text-muted">{{__('Payment Status :')}}</span>
                      @if($order->payment_status == 'Paid')
                      <div class="badge badge-success">
                          {{__('Paid')}}
                      </div>
                      @else
                      <div class="badge badge-danger">
                          {{__('Unpaid')}}
                          </div>
                      @endif
                      <br>
                      <span class="text-muted">{{__('Payment Method :')}}</span>{{$order->payment_method }}<br>

                      <br>
                      <br>
                      </div>
              </div>
              <div class="row">
                  <div class="col-12 col-md-6">
                        <h5>{{__('Billing Address :')}}</h5>
                            @php
                                $bill = json_decode($order->billing_info,true);

                            @endphp

                            <span class="text-muted">{{__('Name')}}: </span>{{$bill['bill_first_name']}} {{$bill['bill_last_name']}}<br>
                            <span class="text-muted">{{__('Email')}}: </span>{{$bill['bill_email']}}<br>
                            <span class="text-muted">{{__('Phone')}}: </span>{{$bill['bill_phone']}}<br>
                            @if (isset($bill['bill_address1']))
                            <span class="text-muted">{{__('Address')}}: </span>{{$bill['bill_address1']}}, {{isset($bill['bill_address2']) ? $bill['bill_address2'] : ''}}<br>
                            @endif
                            @if (isset($bill['bill_country']))
                            <span class="text-muted">{{__('Country')}}: </span>{{$bill['bill_country']}}<br>
                            @endif
                            @if (isset($bill['bill_city']))
                            <span class="text-muted">{{__('City')}}: </span>{{$bill['bill_city']}}<br>
                            @endif
                            @if (isset($state['name']))
                            <span class="text-muted">{{__('State')}}: </span>{{$state['name']}}<br>
                            @endif
                            @if (isset($bill['bill_zip']))
                            <span class="text-muted">{{__('Zip')}}: </span>{{$bill['bill_zip']}}<br>
                            @endif
                            @if (isset($bill['bill_company']))
                            <span class="text-muted">{{__('Company')}}: </span>{{$bill['bill_company']}}<br>
                            @endif


                  </div>
                  <div class="col-12 col-md-6">
                    <h5>{{__('Shipping Address :')}}</h5>
                        @php
                            $ship = json_decode($order->shipping_info,true)
                        @endphp
                            <span class="text-muted">{{__('Name')}}: </span>{{$ship['ship_first_name']}} {{$ship['ship_last_name']}} <br>
                            <span class="text-muted">{{__('Email')}}: </span>{{$ship['ship_email']}}<br>
                            <span class="text-muted">{{__('Phone')}}: </span>{{$ship['ship_phone']}}<br>
                            @if (isset($ship['ship_address1']))
                            <span class="text-muted">{{__('Address')}}: </span>{{$ship['ship_address1']}}, {{isset($ship['ship_address2']) ? $ship['ship_address2'] : ''}}<br>
                            @endif
                            @if (isset($ship['ship_country']))
                            <span class="text-muted">{{__('Country')}}: </span>{{$ship['ship_country']}}<br>
                            @endif
                            @if (isset($ship['ship_city']))
                            <span class="text-muted">{{__('City')}}: </span>{{$ship['ship_city']}}<br>
                            @endif
                            @if (isset($state['name']))
                            <span class="text-muted">{{__('State')}}: </span>{{$state['name']}}<br>
                            @endif
                            @if (isset($ship['ship_zip']))
                            <span class="text-muted">{{__('Zip')}}: </span>{{$ship['ship_zip']}}<br>
                            @endif
                            @if (isset($ship['ship_company']))
                            <span class="text-muted">{{__('Company')}}: </span>{{$ship['ship_company']}}<br>
                            @endif

                  </div>
                </div>
              <div class="row">
                  <div class="col-12">

                  <!-- Table -->
                  <div class="gd-responsive-table">
                      <table class="table my-4">
                      <thead>
                          <tr>
                          <th width="50%" class="px-0 bg-transparent border-top-0">
                              <span class="h6">{{__('Products')}}</span>
                          </th>
                          <th class="px-0 bg-transparent border-top-0">
                              <span class="h6">{{__('Attribute')}}</span>
                          </th>
                          <th class="px-0 bg-transparent border-top-0">
                              <span class="h6">{{__('Quantity')}}</span>
                          </th>
                          <th class="px-0 bg-transparent border-top-0 text-right">
                              <span class="h6">{{__('Price')}}</span>
                          </th>
                          </tr>
                      </thead>
                      <tbody>
                          @php
                              $option_price = 0;
                              $total = 0;
                          @endphp
                      @foreach (json_decode($order->cart,true) as $key  => $item)
                      @php
                            $total += $item['main_price'] * $item['qty'];
                            $option_price += $item['attribute_price'];
                            $grandSubtotal = $total + $option_price;
                            if(App\Models\Item::where('id',$key)->exists()){
                                $main_item = App\Models\Item::findOrFail($key);
                            }else{
                                $main_item = null;
                            }
                        @endphp
                      <tr>
                        <td class="">
                            {{$item['name']}}
                            <p>
                              @if($main_item)
                              @if ($item['item_type'] == 'digital')
                                  @if ($order->payment_status == 'Paid')
                                    @if ($main_item['file_type'] == 'link')
                                    <a href="{{$main_item->link}}" target="_blank" class="btn btn-sm btn-success">{{__('Click Here')}}</a>
                                    @else
                                    <a href="{{asset('assets/files/'.$main_item->file)}}" class="btn btn-sm btn-success">{{__('Download')}}</a>
                                    @endif
                                  @endif
                              @endif

                              @if ($item['item_type'] == 'license')
                              @if ($order->payment_status == 'Paid')
                                  @if ($main_item['file_type'] == 'link')
                                  <a href="{{$main_item->link}}" target="_blank" class="btn btn-sm my-2 btn-success">{{__('Click Here')}}</a>
                                  <p class="py-2">{{__('License Information')}} : {{$item['item_l_n']}} : {{$item['item_l_k']}}</p>
                                  @else
                                  <a href="{{asset('assets/files/'.$main_item->file)}}" class="btn my-2 btn-sm btn-success">{{__('Download')}}</a>
                                  <p class="py-2">{{__('License Information')}} : {{$item['item_l_n']}} : {{$item['item_l_k']}}</p>
                                  @endif
                                @endif
                              @endif

                            @endif
                            </p>
                          </td>
                          <td class="px-0">
                              @if($item['attribute']['option_name'])
                              @foreach ($item['attribute']['option_name'] as $optionkey => $option_name)
                              <span class="entry-meta"><b>{{$option_name}}</b> :
                                  @if ($setting->currency_direction == 1)
                                  {{$order->currency_sign}}{{round($item['attribute']['option_price'][$optionkey]*$order->currency_value,2)}}
                                  @else
                                  {{round($item['attribute']['option_price'][$optionkey]*$order->currency_value,2)}}{{$order->currency_sign}}
                                  @endif

                              </span>
                              @endforeach
                              @else
                              --
                              @endif
                          </td>
                          <td class="px-0">
                              {{$item['qty']}}
                          </td>

                          <td class="px-0 text-right">
                              @if ($setting->currency_direction == 1)
                                  {{$order->currency_sign}}{{round($item['main_price']*$order->currency_value,2)}}
                              @else
                                  {{round($item['main_price']*$order->currency_value,2)}}{{$order->currency_sign}}
                              @endif
                          </td>
                          </tr>
                      @endforeach
                          <tr>
                          <td class="padding-top-2x" colspan="5">
                          </td>
                          </tr>
                          @if($order->tax!=0)
                          <tr>
                          <td class="px-0 border-top border-top-2">
                          <span class="text-muted">{{__('Tax')}}</span>
                          </td>
                          <td class="px-0 text-right border-top border-top-2" colspan="5">
                              <span>
                              @if ($setting->currency_direction == 1)
                                  {{$order->currency_sign}}{{round($order->tax*$order->currency_value,2)}}
                              @else
                              {{round($order->tax*$order->currency_value,2)}}{{$order->currency_sign}}
                              @endif
                              </span>
                          </td>
                          </tr>
                          @endif
                          @if(json_decode($order->discount,true))
                          @php
                              $discount = json_decode($order->discount,true);
                          @endphp
                          <tr>
                          <td class="px-0 border-top border-top-2">
                          <span class="text-muted">{{__('Coupon discount')}} ({{$discount['code']['code_name']}})</span>
                          </td>
                          <td class="px-0 text-right border-top border-top-2" colspan="5">
                              <span class="text-danger">
                              @if ($setting->currency_direction == 1)
                                  -{{$order->currency_sign}}{{round($discount['discount'] * $order->currency_value,2)}}
                              @else
                                  -{{round($discount['discount'] * $order->currency_value,2)}}{{$order->currency_sign}}
                              @endif
                              </span>
                          </td>
                          </tr>
                          @endif
                          @if(json_decode($order->shipping,true))
                          @php
                              $shipping = json_decode($order->shipping,true);
                          @endphp
                          <tr>
                          <td class="px-0 border-top border-top-2">
                          <span class="text-muted">{{__('Shipping')}}</span>
                          </td>
                          <td class="px-0 text-right border-top border-top-2" colspan="5">
                              <span >
                              @if ($setting->currency_direction == 1)
                                  {{$order->currency_sign}}{{round($shipping['price']*$order->currency_value,2)}}
                              @else
                                  {{round($shipping['price']*$order->currency_value,2)}}{{$order->currency_sign}}
                              @endif

                              </span>
                          </td>
                          </tr>
                          @endif
                          @if(json_decode($order->state_price,true))
                          <tr>
                          <td class="px-0 border-top border-top-2">
                          <span class="text-muted">{{__('State Tax')}}</span>
                          </td>
                          <td class="px-0 text-right border-top border-top-2" colspan="5">
                              <span >
                              @if ($setting->currency_direction == 1)
                              {{isset($state['type']) && $state['type'] == 'percentage' ?  ' ('.$state['price'].'%) ' : ''}}  {{$order->currency_sign}}{{round($order['state_price']*$order->currency_value,2)}}
                              @else
                              {{isset($state['type']) &&  $state['type'] == 'percentage' ?  ' ('.$state['price'].'%) ' : ''}}  {{round($order['state_price']*$order->currency_value,2)}}{{$order->currency_sign}}
                              @endif

                              </span>
                          </td>
                          </tr>
                          @endif
                          <tr>
                          <td class="px-0 border-top border-top-2">

                          @if ($order->payment_method == 'Cash On Delivery')
                          <strong>{{__('Total amount')}}</strong>
                          @else
                          <strong>{{__('Total amount due')}}</strong>
                          @endif
                          </td>
                          <td class="px-0 text-right border-top border-top-2" colspan="5">
                              <span class="h3">
                                  @if ($setting->currency_direction == 1)
                                  {{$order->currency_sign}}{{PriceHelper::OrderTotal($order)}}
                                  @else
                                  {{PriceHelper::OrderTotal($order)}}{{$order->currency_sign}}
                                  @endif
                              </span>
                          </td>
                          </tr>
                      </tbody>
                      </table>
                  </div>
                  </div>
              </div> <!-- / .row -->
              </div>
  </div>

@endsection
