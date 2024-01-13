@extends('master.back')

@section('content')

<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0 bc-title"><b>{{ __('Create Blog') }}</b> </h3>
                <a class="btn btn-primary btn-sm" href="{{route('back.post.index')}}"><i class="fas fa-chevron-left"></i> {{ __('Back') }}</a>
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
								<form class="admin-form" action="{{ route('back.post.store') }}" method="POST"
									enctype="multipart/form-data">

                                    @csrf

									@include('alerts.alerts')

									<div class="form-group">
										<label for="name">{{ __('Set Image') }} *</label>
										<br>
											<img class="admin-img" src="{{  asset('assets/images/placeholder.png') }}"
												alt="No Image Found">
										<br>
										<span class="mt-1">{{ __('Image Size Should Be 708 x 277.') }}</span>
									</div>

									<div class="form-group position-relative ">
										<label class="file">
											<input type="file"  accept="image/*"  class="upload-photo" name="photo[]" multiple id="file"
												aria-label="File browser example" >
											<span class="file-custom text-left">{{ __('Upload Image...') }}</span>
										</label>
									</div>
									<div class="form-group">
										<label for="title">{{ __('Title') }} *</label>
										<input type="text" name="title" class="form-control" id="title"
											placeholder="{{ __('Enter Title') }}" value="{{ old('title') }}" >
									</div>

									<div class="form-group">
										<label for="category_id">{{ __('Select Category') }} *</label>
										<select name="category_id" id="category_id" class="form-control" >
											<option value="" selected disabled>{{__('Select Category')}}</option>
											@foreach(DB::table('bcategories')->whereStatus(1)->get() as $category)
											<option value="{{ $category->id }}">{{ $category->name }}</option>
											@endforeach
										</select>
									</div>

									<div class="form-group">
										<label for="details">{{ __('Details') }} *</label>
										<textarea name="details" id="details" class="form-control text-editor" rows="5"
											placeholder="{{ __('Enter Details') }}"
											>{{ old('details') }}</textarea>
									</div>

									<div class="form-group">
										<label for="tags">{{ __('Tags') }}
											</label>
										<input type="text" name="tags" class="tags"
											id="tags"
											placeholder="{{ __('Tags') }}"
											value="">
									</div>

                                    <div class="form-group">
                                        <label for="meta_keywords">{{ __('Meta Keywords') }}
                                            </label>
                                        <input type="text" name="meta_keywords" class="tags"
                                            id="meta_keywords"
                                            placeholder="{{ __('Enter Meta Keywords') }}"
                                            value="">
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="meta_description">{{ __('Meta Description') }}
                                            </label>
                                        <textarea name="meta_descriptions" id="meta_description"
                                            class="form-control" rows="5"
                                            placeholder="{{ __('Enter Meta Description') }}"
                                        ></textarea>
                                    </div>

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
