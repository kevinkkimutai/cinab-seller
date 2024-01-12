@foreach($datas as $data)
    <tr>
        <td>
            {{ $data->title }}
        </td>
        <td>
            @if ($data->id != 1)
            {{ $data->price == 0  ? __('Free') : PriceHelper::adminCurrencyPrice($data->price) }}
            @else
            {{$data->id == 1 && $data->is_condition == 1 ? PriceHelper::adminCurrencyPrice($data->minimum_price). ' Up Condition' : 'Free'}}
            @endif
        </td>
        <td>

            <div class="dropdown">
                <button class="btn btn-{{  $data->status == 1 ? 'success' : 'danger'  }} btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{  $data->status == 1 ? __('Enabled') : __('Disabled')  }}
                </button>
                <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="{{ route('back.shipping.status',[$data->id,1]) }}">{{ __('Enable') }}</a>
                  <a class="dropdown-item" href="{{ route('back.shipping.status',[$data->id,0]) }}">{{ __('Disable') }}</a>
                </div>
              </div>

            </div>

        </td>
        <td>
            <div class="action-list">
                <a class="btn btn-secondary btn-sm "
                    href="{{ route('back.shipping.edit',[$data->id]) }}">
                    <i class="fas fa-edit"></i>
                </a>
                @if ($data->id != 1)
                <a class="btn btn-danger btn-sm " data-toggle="modal"
                    data-target="#confirm-delete" href="javascript:;"
                    data-href="{{ route('back.shipping.destroy',[$data->id]) }}">
                    <i class="fas fa-trash-alt"></i>
                </a>  
                @endif
             
            </div>
        </td>
    </tr>
@endforeach
