@foreach($datas as $data)
    <tr>
        <td>
            {{ $data->title }}
        </td>
        <td>
            {{ strlen(strip_tags($data->details)) > 250 ? substr(strip_tags($data->details),0,250).'...' : strip_tags($data->details) }}
        </td>
        <td>

            <div class="dropdown">
                <button class="btn btn-success btn-sm btn-rounded dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ $data->pos == 2 ? __('Both') : ( $data->pos == 0 ? __('Header') : __('Footer') ) }}
                </button>
                <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="{{ route('back.page.pos',[$data->id,2]) }}">{{ __('Both') }}</a>
                  <a class="dropdown-item" href="{{ route('back.page.pos',[$data->id,0]) }}">{{ __('Header') }}</a>
                  <a class="dropdown-item" href="{{ route('back.page.pos',[$data->id,1]) }}">{{ __('Footer') }}</a>
                </div>
              </div>

            </div>

        </td>
        <td>
            <div class="action-list">
                <a class="btn btn-secondary btn-sm btn-rounded"
                    href="{{ route('back.page.edit',[$data->id]) }}">
                    <i class="fas fa-edit"></i> {{ __('Edit') }}
                </a>
                <a class="btn btn-danger btn-sm btn-rounded" data-toggle="modal"
                    data-target="#confirm-delete" href="javascript:;"
                    data-href="{{ route('back.page.destroy',[$data->id]) }}">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </td>
    </tr>
@endforeach
