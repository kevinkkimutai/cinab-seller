@foreach($datas as $data)
<tr>

    <td>
        <i class="{{ $data->icon }}"></i>
    </td>
    <td>
        {{ $data->title }}
    </td>
    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm "
                href="{{ route('back.feature.edit',$data->id) }}">
                <i class="fas fa-edit"></i> {{ __('Edit') }}
            </a>
            <a class="btn btn-danger btn-sm " data-toggle="modal"
                data-target="#confirm-delete" href="javascript:;"
                data-href="{{ route('back.feature.destroy',$data->id) }}">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </td>
</tr>
@endforeach
