<?php

namespace App\Repositories\Back;

use App\{
    Models\Setting,
    Helpers\ImageHelper
};

class SettingRepository
{

    /**
     * Update setting.
     *
     * @param  \App\Http\Requests\SettingRequest  $request
     * @return void
     */

    public function update($request)
    {



        $data = Setting::find(1);
        $input = $request->all();
   

        $image_files = ['logo','favicon','loader','feature_image','announcement','footer_gateway_img','maintainance_image'];

        $social_fields = ['facebook_check','google_check'];

        foreach($image_files as $image_file){
            if ($file = $request->file($image_file)) {
                $input[$image_file] = ImageHelper::handleUpdatedUploadedImage($file,'/assets/images',$data,'/assets/images/',$image_file);
            }
        }


        if($request->social_icons && $request->social_links){
            $links = ['icons'=>$request->social_icons,'links'=>$request->social_links];
            $input['social_link'] = json_encode($links,true);
        }

        // message text json encode
        if(isset($input['twilio_section'])){
            $input['twilio_section'] = json_encode($input['twilio_section'],true);
        }
   
        $setting_fields = ['is_attribute_search','is_range_search','is_shop','is_blog','is_campaign','is_brands','is_faq','is_contact','is_loader','recaptcha', 'is_google_analytics', 'is_google_adsense', 'is_facebook_pixel', 'is_facebook_messenger','is_privacy_trams','is_guest_checkout'];

        foreach($setting_fields as $setting_field){
            if($request->has($setting_field)){
                $input[$setting_field] = 1;
            }else{
                if($this->checksettingUrl(url()->previous())){
                 $input[$setting_field] = 0;
                }
            }
        }

        $cookie_fields = ['is_cookie'];

        foreach($cookie_fields as $cookie_field){
            if($request->has($cookie_field)){
                $input[$cookie_field] = 1;
            }else{
                if($this->checkCookieUrl(url()->previous())){
                 $input[$cookie_field] = 0;
                }
            }
        }

        foreach($social_fields as $social_field){
            if($request->has($social_field)){
                $input[$social_field] = 1;
            }else{
                if($this->checkSocialUrl(url()->previous())){
                 $input[$social_field] = 0;
                }
            }
        }

        if($request->has('smtp_check')){
            $input['smtp_check'] = 1;
        }else{
            if($this->checkEmailUrl(url()->previous())){
                $input['smtp_check'] = 0;
            }
        }
        if($request->has('is_maintainance')){
            $input['is_maintainance'] = 1;
        }else{
            if($this->checkMaintainanceUrl(url()->previous())){
                $input['is_maintainance'] = 0;
            }
        }

        if($request->has('is_announcement')){
            $input['is_announcement'] = 1;
        }else{
            if($this->checkPopupUrl(url()->previous())){
                $input['is_announcement'] = 0;
            }
        }
        if($request->has('is_announcement')){
            $input['is_announcement'] = 1;
        }else{
            if($this->checkPopupUrl(url()->previous())){
                $input['is_announcement'] = 0;
            }
        }

        if($request->has('meta_keywords')){
            $input['meta_keywords'] = str_replace(["value", "{", "}", "[","]",":","\""], '', $request->meta_keywords);
        }
        
        $data->update($input);
    }



    public function checkEmailUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'email'){
            return true;
        }else{
            return false;
        }
    }
    public function checkMaintainanceUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'maintainance'){
            return true;
        }else{
            return false;
        }
    }


    public function checkSocialUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'social'){
            return true;
        }else{
            return false;
        }
    }
    public function checkPopupUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'announcement'){
            return true;
        }else{
            return false;
        }
    }
    public function checkCookieUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'alert'){
            return true;
        }else{
            return false;
        }
    }
    public function checksettingUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'system'){
            return true;
        }else{
            return false;
        }
    }


}
