@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0"><b>{{ __('Update Slider') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.slider.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
                </div>
        </div>
    </div>

	<!-- Form -->
	<div class="row">

		<div class="col-xl-12 col-lg-12 col-md-12">

			<div class="card o-hidden border-0 shadow-lg">
				<div class="card-body ">
					<!-- Nested Row within Card Body -->
					<div class="row justify-content-center">
						<div class="col-lg-12">
								<form class="admin-form" action="{{ route('back.slider.update',$slider->id) }}"
									method="POST" enctype="multipart/form-data">

                                    @csrf

                                    @method('PUT')

									@include('alerts.alerts')

									<input type="hidden" name="home_page" value="{{$slider->home_page}}">

									@if ($slider->home_page != 'theme4')
									<div class="form-group">
										<label id="change_label" for="name">{{ $slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Feature Image') : __('Logo') }}</label>
										<br>
											<img class="admin-img"
												src="{{ $slider->logo ? asset('assets/images/'.$slider->logo) : asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										<br>
										<span id="change_message" class="mt-1">{{ $slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Image Size Should Be 435 x 530')  :  __('Image Size Should Be 130 x 40')}}</span>
									</div>

									<div class="form-group position-relative ">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="logo" id="file"
												aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>
									<div class="form-group">
										<label for="title">{{ __('Title') }} *</label>
										<input type="text" name="title" class="form-control" id="title"
											placeholder="{{ __('Enter Title') }}" value="{{ $slider->title }}" >
									</div>

									<div class="form-group">
										<label for="slider-link">{{ __('Link') }} *</label>
										<input type="text" name="link" class="form-control" id="slider-link"
											placeholder="{{ __('Enter Link') }}" value="{{ $slider->link }}" >
									</div>


									<div class="form-group">
										<label for="details">{{ __('Details') }} *</label>
										<textarea name="details" id="details" class="form-control" rows="5"
											placeholder="{{ __('Enter Details') }}"
											>{{ $slider->details }}</textarea>
									</div>

									<div class="form-group">
										<label id="slider_text" for="name">{{ $slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Set Background Image') :__('Current Slider Image') }} *</label>
										<br>
											<img class="admin-img"
												src="{{ $slider->photo ? asset('assets/images/'.$slider->photo) : asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										<br>
										<span id="chenge_label2" class="mt-1">{{$slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Image Size Should Be 1920 x 750') : __('Image Size Should Be 1000 x 530 ') }}</span>
									</div>

									<div class="form-group position-relative ">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file"
												aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>

									@else
									<div class="form-group">
										<label for="slider-link">{{ __('Link') }} *</label>
										<input type="text" name="link" class="form-control" id="slider-link"
											placeholder="{{ __('Enter Link') }}" value="{{ $slider->link }}" >
									</div>
									<input name="details" type="hidden" id="details" value="theme4" class="form-control" rows="5"
                                    placeholder="{{ __('Enter Details') }}"
                                    >
									<input type="hidden" name="title" class="form-control" id="title"
                                    placeholder="{{ __('Enter Title') }}" value="theme 4" >
									<div class="form-group">
										<label id="slider_text" for="name">{{ $slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Set Background Image') :__('Current Slider Image') }} *</label>
										<br>
											<img class="admin-img"
												src="{{ $slider->photo ? asset('assets/images/'.$slider->photo) : asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										<br>
										<span id="chenge_label2" class="mt-1">{{$slider->home_page == 'theme3' || $slider->home_page == 'theme4' ? __('Image Size Should Be 1920 x 750') : __('Image Size Should Be 1000 x 530 ') }}</span>
									</div>

									<div class="form-group position-relative ">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="photo" id="file"
												aria-label="File browser example">
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>
									@endif
									


								    <div class="form-group">
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
