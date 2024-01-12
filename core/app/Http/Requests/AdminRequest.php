<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
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
        
        $id = $this->staff ? ',' . $this->staff->id : '';
        $required = $this->staff ? '' : 'required';

        return [
            'email'      => [$required,'unique:admins,email'. $id],
            'photo'     => [$required,'mimes:jpeg,jpg,png,svg']
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
            'email.unique'    => __('This email has already been taken.'),
            'photo.required' => __('Image field is required.'),
            'photo.mimes'    => __('Image type must be jpg,jpeg,png,svg.'),
        ];
    }
}
