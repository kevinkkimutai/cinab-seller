<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryRequest extends FormRequest
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
        
        $id = $this->subcategory ? ',' . $this->subcategory->id : '';
        $required = $this->subcategory ? '' : 'required';
        
        return [
            'slug'  => [$required,'regex:/^[a-zA-Z0-9-]+$/'],
            'category_id'  => 'required',
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
            'category_id.required'  => __('Category field is required.'),
            'slug.required'  => __('Slug field is required.'),
            'slug.regex'     => __('Slug Must Not Have Any Special Characters.'),
        ];
    }
}
