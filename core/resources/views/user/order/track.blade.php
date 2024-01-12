@if(!isset($error))

            <div class="progress-area-step pt-4">
                <ul class="progress-steps">
                @for($i=0; $i <= $numbers; $i++)

                @if($i == 0)
                    @if(!empty($track_orders[$i]))
                        @if($track_orders[$i]['title'] == 'Pending')
                            <li class="active">
                                <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                                <div class="progress-title">{{ __('Pending') }}</div>
                                <div class="progress-title">{{ date('l, d M, Y',strtotime($track_orders[$i]['created_at'])) }}</div>
                                <div class="progress-title">{{ __('Product Pending For Approval') }}</div>
                            </li>
                        @else
                        <li>
                            <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                            <div class="progress-title">{{ __('Pending') }}</div>
                            <div class="progress-title">{{ __('Soon') }}</div>
                        </li>
                        @endif
                    @else
                    <li>
                        <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                        <div class="progress-title">{{ __('Pending') }}</div>
                        <div class="progress-title">{{ __('Soon') }}</div>
                    </li>
                    @endif
                @endif
                @if (!isset($track_orders[3]))


                @if($i == 1)
                    @if(!empty($track_orders[$i]))
                        @if($track_orders[$i]['title'] == 'In Progress')
                        <li class="active">
                            <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                            <div class="progress-title">{{ __('Processing') }}</div>
                            <div class="progress-title">{{ date('l, d M, Y',strtotime($track_orders[$i]['created_at'])) }}</div>
                            <div class="progress-title">{{ __('Product Shift For Delevery') }}</div>
                        </li>
                        @else
                        <li>
                            <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                            <div class="progress-title">{{ __('Processing') }}</div>
                            <div class="progress-title">{{ __('Soon') }}</div>
                        </li>
                        @endif
                    @else
                    <li>
                        <div class="icon"><i class="fas fa-arrow-alt-circle-right"></i></div>
                        <div class="progress-title">{{ __('Processing') }}</div>
                        <div class="progress-title">{{ __('Soon') }}</div>
                    </li>
                    @endif
                @endif


                @if($i == 2)
                    @if(!empty($track_orders[$i]))
                        @if($track_orders[$i]['title'] == 'Delivered')
                        <li class="active">
                            <div class="icon"><i class="fas fa-check-circle"></i></div>
                            <div class="progress-title">{{ __('Delivered') }}</div>
                            <div class="progress-title">{{ date('l, d M, Y',strtotime($track_orders[$i]['created_at'])) }}</div>
                            <div class="progress-title">{{ __('Product Delevery Compleate') }}</div>
                        </li>
                        @else
                        <li>
                            <div class="icon"><i class="fas fa-check-circle"></i></div>
                            <div class="progress-title">{{ __('Delivered') }}</div>
                            <div class="progress-title">{{ __('Soon') }}</div>
                        </li>
                        @endif
                    @else
                    <li>
                        <div class="icon"><i class="fas fa-check-circle"></i></div>
                        <div class="progress-title">{{ __('Delivered') }}</div>
                        <div class="progress-title">{{ __('Soon') }}</div>
                    </li>
                    @endif

                @endif

                @endif

                @if($i == 3)
                    @if(!empty($track_orders[$i]))
                        @if($track_orders[$i]['title'] == 'Canceled')
                        <li class="active">
                            <div class="icon"><i class="fas fa-times-circle"></i></div>
                            <div class="progress-title">{{ __('Rejected') }}</div>
                            <div class="progress-title">{{ date('l, d M, Y',strtotime($track_orders[$i]['created_at'])) }}</div>
                            <div class="progress-title">{{ __('Product Delevery Rejected') }}</div>
                        </li>
                        @else
                        <li>
                            <div class="icon"><i class="fas fa-times-circle"></i></div>
                            <div class="progress-title">{{ __('Rejected') }}</div>
                            <div class="progress-title">{{ __('Not') }}</div>
                        </li>
                        @endif
                    @else
                    <li>
                        <div class="icon"><i class="fas fa-times-circle"></i></div>
                        <div class="progress-title">{{ __('Rejected') }}</div>
                        <div class="progress-title">{{ __('Not') }}</div>
                    </li>
                    @endif

                @endif

                @endfor
            </ul>
        </div>


@else

    <p>{{__('Order Not Found')}}</p>
@endif
