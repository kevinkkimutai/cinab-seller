<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BcategoryRequest extends FormRequest
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
        
        $id = $this->bcategory ? ',' . $this->bcategory->id : '';
        $required = $this->category ? '' : 'required';

        return [
            'slug'      => [$required,'unique:bcategories,slug'. $id,'regex:/^[a-zA-Z0-9-]+$/'],
            'name'  => 'required|max:255'
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
            'slug.required'  => __('Slug field is required.'),
            'slug.unique'    => __('This slug has already been taken.'),
            'slug.regex'     => __('Slug Must Not Have Any Special Characters.'),
        ];
    }
}
