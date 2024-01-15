<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class PromoCodeRequest extends FormRequest
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

        $id = $this->code ? ',' . $this->code->id : '';

        return  [
            'code_name' => 'required|max:255|unique:promo_codes,code_name' . $id,
            'title' => 'required|max:255',
            'no_of_times' => 'required|numeric|max:9999999999',
            'discount' => 'required|numeric|max:9999999999',
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
            'code_name.required' => __('Code field is required.'),
            'code_name.unique'   => __('This code has already been taken.'),

        ];
    }


}
