@foreach($datas as $data)
<tr>
    <td>
        {{ $data->type }}
    </td>
    <td>
        <img src="{{ $data->image ? asset('assets/images/'.$data->image) : asset('assets/images/placeholder.png') }}" alt="Image Not Found">
    </td>

    <td>
        {{ $data->title }}
    </td>
    <td>
        {{ $data->subtitle }}
    </td>
    <td>

        <div class="dropdown">
            <button class="btn btn-{{  $data->status == 1 ? 'success' : 'danger'  }} btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{  $data->status == 1 ? __('Enabled') : __('Disabled')  }}
            </button>
            <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="{{ route('back.banner.status',[$data->id,1]) }}">{{ __('Enable') }}</a>
              <a class="dropdown-item" href="{{ route('back.banner.status',[$data->id,0]) }}">{{ __('Disable') }}</a>
            </div>
          </div>

        </div>

    </td>
    <td>
        <div class="action-list">
            <a class="btn btn-secondary btn-sm "
                href="{{ route('back.banner.edit',$data->id) }}">
                <i class="fas fa-edit"></i>
            </a>
        </div>
    </td>
</tr>
@endforeach
