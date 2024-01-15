@if (Session::has('success'))
<div class="alert alert-success alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <b>{{ Session::get('success') }}</b>
</div>
@endif

@if(count($errors) > 0)
<div class="alert alert-danger validation">
	
	<ul class="text-left {{ count($errors) == 1 ? 'list-unstyled' : '' }}">
		@foreach($errors->all() as $error)
		<li>
            <b>{{$error}}</b>
        </li>
		@endforeach
	</ul>
</div>

@endif
