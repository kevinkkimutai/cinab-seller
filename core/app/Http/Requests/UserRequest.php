<?php

namespace App\Http\Requests;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends FormRequest
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

        $id = Auth::check() ? ',' . Auth::user()->id : '';
        $setting = Setting::first();
        $password = Auth::check() ? '' : 'required|';
        $check = Auth::check() ? 'nullable|min:6|max:16' : "min:6|max:16|confirmed";

        return [
            'g-recaptcha-response' => $setting->recaptcha == 1 ?  $password : '',
            'first_name' => $password.'|max:255',
            'photo'      => 'image|max:2048',
            'last_name'  => 'required|max:255',
            'phone'      => 'required|max:255',
            'email'      => Auth::guard('admin') ? 'required|email': 'required|email|unique:users,email'. $id,
            'password'   => $password.$check,
            'password_confirmation'   => $password,
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
            'g-recaptcha-response.required' => __('Please verify that you are not a robot.'),
            'first_name.required' => __('First Name is required.'),
            'last_name.required' => __('Last Name field is required.'),
            'country.required' => __('Country is required.'),
            'city.required' => __('City is required.'),
            'address.required' => __('Address is required.'),
            'zip.required' => __('Zip Code is required.'),
            'phone.required' => __('Phone Number is required.'),
            'email.required' => __('Email field is required.'),
            'email.email'   => __('The email must be a valid email address.'),
            'password.required'    => __('Password field is required.')
        ];
    }
}
