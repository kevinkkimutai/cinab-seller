@foreach($datas as $data)
<tr>

    <td>
        {{ $data->name }}
    </td>
    <td>
        @if($data->section != 'null')
        @foreach (json_decode($data->section,true) as $item)
            <span class="badge badge-primary m-1 p-2">{{$item}}</span>
        @endforeach
        @else
        --
        @endif
    </td>

    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm "
                href="{{ route('back.role.edit',$data->id) }}">
                <i class="fas fa-edit"></i>
            </a>
            <a class="btn btn-danger btn-sm " data-toggle="modal"
                data-target="#confirm-delete" href="javascript:;"
                data-href="{{ route('back.role.destroy',$data->id) }}">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </td>
</tr>
@endforeach
