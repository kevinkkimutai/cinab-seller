@extends('vendor.installer.layouts.master')

@section('template_title')
    {{ trans('installer_messages.permissions.templateTitle') }}
@endsection


@section('title') 
    <i class="fa fa-folder fa-fw" aria-hidden="true"></i>
    {{ trans('installer_messages.permissions.title') }}
@endsection

@section('container')

    <ul class="list">
        @foreach($permissions['permissions'] as $permission)
        <li class="list__item list__item--permissions {{ $permission['isSet'] ? 'success' : 'error' }}">
            @if ($permission['folder'] == 'storage/framework/')
            storage/framework/
            @elseif ($permission['folder'] == 'storage/logs/')
            storage/logs/
            @elseif ($permission['folder'] == 'bootstrap/cache/')
            bootstrap/cache/
            @elseif ($permission['folder'] == '../assets/images/')
            assets/images/
            @elseif ($permission['folder'] == '../assets/sitemaps/')
            assets/sitemaps/
            @elseif ($permission['folder'] == '../assets/files/')
            assets/files/
            @elseif ($permission['folder'] == 'resources/lang/')
            resources/lang/
            @endif
            <span>
                <i class="fa fa-fw fa-{{ $permission['isSet'] ? 'check-circle-o' : 'exclamation-circle' }}"></i>
                {{ $permission['permission'] }}
            </span>
        </li>
        @endforeach
    </ul>

    @if ( ! isset($permissions['errors']))
        <div class="buttons">
            <a href="{{ route('LaravelInstaller::license') }}" class="button">
                Verify License
                <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i>
            </a>
        </div>
    @endif

@endsection
