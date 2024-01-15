<?php

namespace App\Http\Requests;

use Illuminate\{
    Foundation\Http\FormRequest,
    Http\Exceptions\HttpResponseException,
    Contracts\Validation\Validator
};

class SubscribeRequest extends FormRequest
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
        return [
            'email' => ['required' , 'unique:subscribers,email'],
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
            'email.required' => __('Email field is required.'),
            'email.unique'   => __('This email has already been taken.')
        ];
    }


    /**
     * Returning json response.
     *
     * @return array
     */

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(array('errors' => $validator->getMessageBag()->toArray())));
    }

}
