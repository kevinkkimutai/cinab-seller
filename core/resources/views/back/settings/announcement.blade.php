@extends('master.back')

@section('content')

<div class="container-fluid">

   	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"> <b>{{ __('Announcement') }}</b> </h3>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row">
						<div class="col-lg-12">
							<div class="p-5">
								<div class="admin-form">

									@include('alerts.alerts')

                                    <div class="row justify-content-center">

                                        <div class="col-lg-8">

                                            <form action="{{ route('back.setting.update') }}" method="POST"
                                            enctype="multipart/form-data">

                                            @csrf


                                                <div class="form-group">
                                                    <label class="switch-primary">
                                                      <input type="checkbox" class="switch switch-bootstrap status radio-check" name="is_announcement" value="1" {{ $setting->is_announcement == 1 ? 'checked' : '' }}>
                                                      <span class="switch-body"></span>
                                                      <span class="switch-text">{{ __('Announcement Banner') }}</span>
                                                    </label>
                                                </div>

                                                <div class="form-group">
                                                    <label for="announcement_type">{{ __('Select Type') }} *</label>
                                                    <select name="announcement_type" id="announcement_type" class="form-control" >
                                                        <option value="banner" {{$setting->announcement_type =='banner' ? 'selected' : ''}} >{{__('Announcement')}}</option>
                                                        <option value="newletter" {{$setting->announcement_type =='newletter' ? 'selected' : ''}}>{{__('Newsletter Popup')}}</option>
                                                    </select>
                                                </div>

                                                <div class="image-show {{ $setting->is_announcement == 1 ? '' : 'd-none' }}">

                                                    <div class="form-group">
                                                        <label for="name">{{ __('Image') }}</label>
                                                        <div class="col-lg-12 pb-1">
                                                            <img class="admin-img lg"
                                                                src="{{ $setting->announcement ? asset('assets/images/'.$setting->announcement) : asset('assets/images/placeholder.png') }}"
                                                                alt="No Image Found">
                                                        </div>
                                                        <span>{{ __('Image Size Should Be 520 x 529. For Announcement Popuop') }}</span> <br>
                                                        <span>{{ __('Image Size Should Be 300 x 400. For Newsletter Popuop') }}</span>
                                                    </div>

                                                    <div class="form-group position-relative ">
                                                        <label class="file">
                                                            <input type="file"  accept="image/*"  class="upload-photo" name="announcement" id="file" aria-label="File browser example">
                                                            <span class="file-custom text-left">{{ __('Upload Image...') }}</span>
                                                        </label>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="announcement_delay">{{ __('Announcement Delay (secend)') }} *</label>
                                                        <input type="text" name="announcement_delay" class="form-control" id="announcement_delay"
                                                            placeholder="{{ __('Announcement Delay') }}" value="{{ $setting->announcement_delay }}" >
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="announcement_title">{{ __('Newsletter Title') }} *</label>
                                                        <input type="text" name="announcement_title" class="form-control" id="announcement_title"
                                                            placeholder="{{ __('Popup Title') }}" value="{{ $setting->announcement_title }}" >
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="announcement_details">{{ __('Newsletter Text') }} *</label>
                                                        <textarea name="announcement_details" class="form-control" id="announcement_details" >{{ $setting->announcement_details }}</textarea>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="announcement_link">{{ __('Announcement Link') }} *</label>
                                                        <input type="text" name="announcement_link" class="form-control" id="announcement_link"
                                                            placeholder="{{ __('Link') }}" value="{{ $setting->announcement_link }}" >
                                                    </div>

                                                </div>



                                                <div>

                                                    <div class="form-group d-flex justify-content-center">
                                                        <button type="submit" class="btn btn-secondary ">{{ __('Submit') }}</button>
                                                    </div>

                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
