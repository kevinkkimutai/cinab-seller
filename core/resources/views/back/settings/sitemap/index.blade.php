@extends('master.back')

@section('content')

<!-- Start of Main Content -->
<div class="container-fluid">

	<!-- Page Heading -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-sm-flex align-items-center justify-content-between">
                <h3 class=" mb-0bc-title"><b>{{ __('Sitemap') }}</b></h3>
                <a class="btn btn-primary  btn-sm" href="{{route('admin.sitemap.add')}}"><i class="fas fa-plus"></i> {{ __('Add') }}</a>
                </div>
        </div>
    </div>


	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body">
			@include('alerts.alerts')
			<div class="table-responsive">
				<table class="table table-bordered table-striped" id="admin-table" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                        <th scope="col">{{ __('URL') }}</th>
                        <th scope="col">{{ __('File Name') }}</th>
                        <th scope="col">{{ __('Actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($sitemaps as $key => $sitemap)
                        <tr>
                            <td>{{$sitemap->sitemap_url}}</td>
                            <td>{{$sitemap->filename}}</td>
                            <td>
                                <form class="d-inline-block" action="{{route('admin.sitemap.download', $sitemap->id)}}" method="post">
                                        @csrf
                                        <input type="hidden" name="filename" value="{{$sitemap->filename}}">
                                        <button type="submit" class="btn btn-info btn-sm">
                                        <span class="btn-label">
                                            <i class="fas fa-arrow-alt-circle-down"></i>
                                        </span>
                                        Download
                                        </button>
                                </form>
                                <a class="btn btn-danger btn-sm " data-toggle="modal"
                                    data-target="#confirm-delete" href="javascript:;"
                                    data-href="{{ route('admin.sitemap.delete',[$sitemap->id]) }}">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    </table>
				</table>
			</div>
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
			{{ __('You are going to delete this page. All contents related with this page will be lost.') }} {{ __('Do you want to delete it?') }}
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
