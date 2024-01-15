<?php

namespace App\Repositories\Both;

use App\Helpers\EmailHelper;
use Illuminate\Support\Facades\Hash;

class ForgotRepository
{
    /**
     * Forgot password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function forgot($data,$request,$auth)
    {
        $input =  $request->all();
        $token = md5(time().$data->name.$data->email);
        $input['email_token'] = $token;
        $data->update($input);
        $subject = "Reset Password Request";
        $msg = "Please click this link : ".'<a href="'.route($auth.'.change.token',$token).'">'.route($auth.'.change.token',$token).'</a>'.' to change your password.';

        $emailData = [
            'to' => $request->email,
            'subject' => $subject,
            'body' => $msg,
        ];
        $email = new EmailHelper();
        $email->sendCustomMail($emailData);
    }

    /**
     * Update password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function updatePassword($data,$request,$type)
    {
       
        if ($request->current_password){
            if (Hash::check($request->current_password, $data->password)){
                if ($request->new_password == $request->renew_password){
                    $input['password'] = Hash::make($request->new_password);
                }else{
                    return [
                        'status'  => false,
                        'message' => __('Confirm password does not match.')
                    ];
                }
            }else{
                return [
                    'status'  => false,
                    'message' => __('Current password Does not match.')
                ];
            }
        }
        
       
            if ($request->new_password == $request->renew_password){
                $input['password'] = Hash::make($request->new_password);
            }else{
                return [
                    'status'  => false,
                    'message' => __('Confirm password does not match.')
                ];
            }
        

        $input['email_token'] = null;
        $data->update($input);

        return [
            'status'       => true,
            'redurect_url' => route($type.'.login'),
            'message'      => __('Successfully changed your password')
        ];

    }

}
