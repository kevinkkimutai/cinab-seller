@if (Session::has('modal_errors'))
<div class="alert alert-danger alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <b>{{ Session::get('modal_errors') }}</b>
</div>
@endif
