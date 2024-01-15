@foreach($datas as $data)
<tr>
    <td>
        {{ $data->name }}
    </td>
    <td>
        {{ $data->sign }}
    </td>
    <td>
        {{ $data->value }}
    </td>
    <td>

        <div class="dropdown">
            <button class="btn btn-{{  $data->is_default == 1 ? 'success' : 'dark'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{  $data->is_default == 1 ? __('Defualt') : __('Set Defualt')  }}
            </button>
            <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="{{ route('back.currency.status',[$data->id,1]) }}">{{ __('Enable') }}</a>
              <a class="dropdown-item" href="{{ route('back.currency.status',[$data->id,0]) }}">{{ __('Disable') }}</a>
            </div>
          </div>



    </td>
    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm "
                href="{{ route('back.currency.edit',$data->id) }}">
                <i class="fas fa-edit"></i>
            </a>
            @if ($data->id != 1)
                <a class="btn btn-danger btn-sm " data-toggle="modal"
                    data-target="#confirm-delete" href="javascript:;"
                    data-href="{{ route('back.currency.destroy',$data->id) }}">
                    <i class="fas fa-trash-alt"></i>
                </a>
            @endif

        </div>
    </td>
</tr>
@endforeach
