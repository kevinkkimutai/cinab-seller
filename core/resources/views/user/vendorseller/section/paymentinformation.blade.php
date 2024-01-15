@extends('master.front')
@section('title')
    {{__('Dashboard')}}
@endsection
@section('content')

    <!-- Page Title-->
    <div class="page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="breadcrumbs">
                        <li><a href="{{ route('front.index')}}">{{__('Home')}}</a> </li>
                        <li class="separator"></li>
                        <li>{{__('Welcome Back')}}, {{$user->first_name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Content-->
    <div class="container padding-bottom-3x mb-1">
        <div class="row">
            @include('includes.user_sitebar')
            <div class="col-lg-9">
                @include("user.vendorseller.section.sellerTopsection")
                <div class="card">
                    <div class="card-body">
                        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                        <div class="mb-3">
                            <h6 class="mb-0">Preferred payment option:</h6>
                            <span class="mt-0">Select the payment method, if applicable, of your choice,and ensure to provide all required details. We'll review the validity of your documents upon submission.</span>
                        </div>
                        <form  class="row" action="{{route('user.profile.update')}}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="col-md-12 mb-3">
                                <label for="account-fn">{{__("Bank Account")}}</label>
                                <hr>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Beneficiary Name')}}</label>
                                    <input class="form-control" name="BeneficiaryName" type="text" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Bank Account Number')}}</label>
                                    <input class="form-control" name="BankAccountNumber" type="text" id="account-fn" >
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="account-fn">{{__('IBAN')}}</label>
                                    <input class="form-control" name="IBAN" type="text" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="account-fn">{{__('SWIFT Code')}}</label>
                                    <input class="form-control" name="SWIFTCode" type="text" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Bank Name')}}</label>
                                    <input class="form-control" name="BankName" type="text" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Bank Information Document')}}</label>
                                    <input class="form-control" name="BankInformationDocument" type="file" id="account-fn" value="">
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <label for="account-fn">{{__("Mpesa ")}}</label>
                                <hr>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('MPesa Number')}}</label>
                                    <input class="form-control" name="MPesaNumber" type="number" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Full Mpesa Name')}}</label>
                                    <input class="form-control" name="FullMpesaName" type="text" id="account-fn" value="">
                                </div>
                            </div>


                            <div class="col-12">
                                <hr class="mt-2 mb-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <button class="btn btn-primary margin-right-none" type="submit"><span>{{__('Submit')}}</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
