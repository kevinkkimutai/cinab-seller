@foreach($datas as $data)
<tr>

    <td>
        {{ $data->title }}
    </td>
    <td>
        {{ $data->category->name }}
    </td>
    <td>
        {{ $data->details }}
    </td>
    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm btn-rounded"
                href="{{ route('back.faq.edit',$data->id) }}">
                <i class="fas fa-edit"></i> {{ __('Edit') }}
            </a>
            <a class="btn btn-danger btn-sm btn-rounded" data-toggle="modal"
                data-target="#confirm-delete" href="javascript:;"
                data-href="{{ route('back.faq.destroy',$data->id) }}">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </td>
</tr>
@endforeach
