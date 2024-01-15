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
                            <h6 class="mb-0">Business Information</h6>
                            <span class="mt-0">Please provide business information</span>
                        </div>
                        <form  class="row" action="{{route('user.profile.update')}}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Company Name')}}</label>
                                    <input class="form-control" name="companyName" type="text" id="account-fn" value="">
                                    @error('first_name')
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Business Registration Number')}}</label>
                                    <input class="form-control" name="BusinessRegistrationNumber" type="text" value="">
                                    @error('BusinessRegistrationNumber')
                                    <p class="text-danger">{{$message}}</p>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('CR12')}}</label>
                                    <input class="form-control" name="cr12" type="file"  value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Certificate of registration')}}</label>
                                    <input class="form-control" name="Certificateofregistration" type="file" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Tax Identification Number (TIN)')}}</label>
                                    <input class="form-control" name="TaxIdentificationNumber" type="text" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Tax Identification Number (TIN)')}}</label>
                                    <input class="form-control" name="TaxIdentificationNumber" type="file" id="account-fn" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('VAT Number')}}</label>
                                    <input class="form-control" name="VATNumber" type="text" value="">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Address Line 1')}}</label>
                                    <input class="form-control" name="AddressLine1" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Address Line 2')}}</label>
                                    <input class="form-control" name="AddressLine2" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('City/Town')}}</label>
                                    <input class="form-control" name="CityorTown" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('State/Region')}}</label>
                                    <input class="form-control" name="stateRegion" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Postal Address')}}</label>
                                    <input class="form-control" name="PostalAddress" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Postal Code')}}</label>
                                    <input class="form-control" name="PostalCode" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                               <label for="account-fn">{{__("Legal Representative's Details")}}</label>
                                <hr>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('Full Name')}}</label>
                                    <input class="form-control" name="RepresentativeFullName" type="text" value="">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('ID No')}}</label>
                                    <input class="form-control" name="IDNo" type="number" value="">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account-fn">{{__('ID Image (Both sides in one page)')}}</label>
                                    <input class="form-control" name="IDImage" type="file"  value="">
                                </div>
                            </div>
                            <div class="col-12">
                                <hr class="mt-2 mb-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <a href="{{route('user.shippnginfo')}}" class="btn btn-primary margin-right-none" type="submit"><span>{{__('Submit')}}</span></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
