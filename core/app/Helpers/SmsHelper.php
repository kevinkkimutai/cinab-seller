<?php
namespace App\Helpers;
use App\Models\Setting;
use Twilio\Rest\Client;

class SmsHelper {

    public function SendSms($to_number ,$type,$order_number = null)
    {
        $setting = Setting::first();
        $code = str_split($setting->twilio_country_code);
         array_pop($code);
        
         $new_code = implode('',$code);
         $sms_section = json_decode($setting->twilio_section,true);

        
        try {
            // Your Account SID and Auth Token from twilio.com/console
            $account_sid = $setting->twilio_sid;
            $auth_token = $setting->twilio_token;
            $twilio_number = $setting->twilio_form_number;

            $client = new Client($account_sid, $auth_token);
            $body = preg_replace("/{order_number}/", $order_number ,$sms_section[$type]);
           
            $client->messages->create(
                $new_code.$to_number,
                array(
                    'from' => $twilio_number,
                    'body' => $body,
                )
            );
    
        } catch (\Throwable $th) {
            // throw $th;
        }
      

       
    }
}