@foreach($datas as $data)
    <tr>
        <td>
            {{ $data->name }}
        </td>
        <td>
            <div class="action-list">
                <a class="btn btn-secondary btn-sm "
                    href="{{ route('back.attribute.edit',[$item->id,$data->id]) }}">
                    <i class="fas fa-edit"></i> {{ __('Edit') }}
                </a>
                <a class="btn btn-danger btn-sm " data-toggle="modal"
                    data-target="#confirm-delete" href="javascript:;"
                    data-href="{{ route('back.attribute.destroy',[$item->id,$data->id]) }}">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </td>
    </tr>
  
@endforeach
<tr class="text-center">
    <td colspan="3">
        <a class="btn btn-secondary btn-sm "
        href="{{ route('back.option.index',$item->id) }}">
        <i class="fas fa-tasks"></i> {{ __('Manage Options') }}
    </a>
    </td>
</tr>