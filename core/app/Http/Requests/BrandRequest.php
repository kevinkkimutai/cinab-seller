<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
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
        $id = $this->brand ? ',' . $this->brand->id : '';
        $required = $this->brand ? '' : 'required';

        return [
            'photo'      => [$required,'mimes:jpeg,jpg,png,svg'],
            'name'      => 'required|max:255',
            'slug'      => [$required,'unique:brands,slug'. $id,'regex:/^[a-zA-Z0-9-]+$/'],
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
            'photo.required'  => __('Photo field is required.'),
            'photo.mimes'  => __('Photo file format not supported.'),
            'slug.required'  => __('Slug field is required.'),
            'slug.unique'    => __('This slug has already been taken.'),
            'slug.regex'     => __('Slug Must Not Have Any Special Characters.'),
        ];
    }
}
