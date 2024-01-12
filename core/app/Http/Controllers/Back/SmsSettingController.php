<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\EmailTemplate,
    Http\Controllers\Controller,
};
use App\Models\Setting;
use Illuminate\Http\Request;

class SMSSettingController extends Controller
{

    /**
     * Constructor Method.
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    /**
     * Show the form for updating resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sms()
    {
        return view('back.settings.sms');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(EmailTemplate $template)
    {
        return view('back.email_template.edit',compact('template'));
    }

    public function smsUpdate(Request $request)
    {
       
        $request->validate([
            "twilio_sid" => "required:max:200",
            "twilio_token" => "required|max:100",
            "twilio_form_number" => "required|max:100",
            "twilio_country_code" => "required|max:100",
        ]);
        $input = $request->all();
        if(isset($request['is_twilio'])){
            $input['is_twilio'] = 1;
        }else{
            $input['is_twilio'] = 0;
        }

        Setting::first()->update($input);
        return redirect()->back()->withSuccess(__('Data Updated Successfully.'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,EmailTemplate $template)
    {
        $template->update($request->all());
        return redirect()->route('back.setting.email')->withSuccess(__('Email Template Updated Successfully.'));
    }


}
