<?php

namespace App\Repositories\Front;

use App\{
    Models\User,
    Models\Setting,
    Helpers\EmailHelper,
    Models\Notification
};
use App\Helpers\ImageHelper;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class UserRepository
{

    public function register($request){
        $input = $request->all();

        $user = new User;
        $input['password'] = bcrypt($request['password']);
        $input['email'] = $input['email'];
        $input['first_name'] = $input['first_name'];
        $input['last_name'] = $input['last_name'];
        $input['phone'] = $input['phone'];
        $verify = Str::random(6);
        $input['email_token'] = $verify;
        $user->fill($input)->save();

        Notification::create(['user_id' => $user->id]);

        $emailData = [
            'to' => $user->email,
            'type' => "Registration",
            'user_name' => $user->displayName(),
            'order_cost' => '',
            'transaction_number' => '',
            'site_title' => Setting::first()->title,
        ];

        $email = new EmailHelper();
        $email->sendTemplateMail($emailData);

    }





    public function profileUpdate($request){
        $input = $request->all();
        if($request['user_id']){
            $user = User::findOrFail($request['user_id']);
        }else{
            $user = Auth::user();
        }


        if($request->password){
            $input['password'] = bcrypt($input['password']);
            $user->password = $input['password'];
            $user->update();
        }


        if ($file = $request->file('photo')) {
            $input['photo'] = ImageHelper::handleUpdatedUploadedImage($file,'/assets/images',$user,'/assets/images/','photo');
        }

        if($request->newsletter){
            if(!Subscriber::where('email',$user->email)->exists()){
                Subscriber::insert([
                    'email' => $user->email
                ]);
            }
        }else{
            Subscriber::where('email',$user->email)->delete();
        }

        $user->fill($input)->save();
    }




}
