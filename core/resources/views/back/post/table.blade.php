@foreach($datas as $data)
<tr id="blog-bulk-delete">
    <td><input type="checkbox" class="bulk-item" value="{{$data->id}}"></td>

  <td>
      <img src="{{ isset(json_decode($data->photo,true)[0]) ?  asset('assets/images/'.json_decode($data->photo,true)[0]) : asset('assets/images/placeholder.png')}}" alt="">

  </td>
    <td>
        {{ $data->title }}
    </td>
    <td>
        {{ $data->category->name }}
    </td>

    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm "
                href="{{ route('back.post.edit',$data->id) }}">
                <i class="fas fa-edit"></i>
            </a>
            <a class="btn btn-danger btn-sm " data-toggle="modal"
                data-target="#confirm-delete" href="javascript:;"
                data-href="{{ route('back.post.destroy',$data->id) }}">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </td>
</tr>
@endforeach
