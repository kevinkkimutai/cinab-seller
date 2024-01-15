<?php

namespace App\Http\Requests;

use Illuminate\{
    Validation\Rule,
    Foundation\Http\FormRequest
};


class AttributeOptionRequest extends FormRequest
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

        $data = $this->request->all();
        $id = $this->option ?  $this->option->id : '';

        return  [
            'name' => 'required|max:100',Rule::unique('attribute_options', 'name')->where(function ($query) use ($data) {
                return $query->where('attribute_id', $data['attribute_id']);
            })->ignore($id),
            'attribute_id' => 'required',
            'stock' => 'required',
            'price' => 'required|numeric|max:9999999999'
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
            'name.required' => __('Name field is required.'),
            'name.unique'   => __('This name has already been taken.'),
        ];
    }


}
