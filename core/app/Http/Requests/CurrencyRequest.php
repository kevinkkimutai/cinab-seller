<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->currency ? ',' . $this->currency->id : '';
        $required = $this->currency ? '' : 'required';

        return [
            'name'      => $required.'|max:10|unique:currencies,name'. $id,
            'sign'      => 'required',
            'value'    =>   'required|numeric|max:50000'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'  => __('Name field is required.'),
            'name.unique'    => __('This Currency name has already been taken.'),
            'sign.required'     => __('Currency sign field is required.'),
            'value.required'     => __('Currency value field is required.'),
        ];
    }
}
