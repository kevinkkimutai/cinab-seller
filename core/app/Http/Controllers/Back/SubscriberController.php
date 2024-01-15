<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Subscriber,
    Helpers\EmailHelper,
    Http\Controllers\Controller
};

use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return view('back.subscribers.index',[
            'datas' => Subscriber::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for sending mail to subscribers.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendMail(){
        return view('back.subscribers.mail');
    }


    /**
     * Sending mail to the subscribers
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendMailSubmit(Request $request){

        $request->validate([
            'subject' => 'required|max:255',
            'details' => 'required',
        ]);


        $subject = $request->subject;
        $msg = $request->details;
        foreach(Subscriber::oldest('id')->get() as $subscriber){
            $emailData = [
                'to' => $subscriber->email,
                'subject' => $subject,
                'body' => $msg,
            ];

            $email = new EmailHelper();
            $email->sendCustomMail($emailData);
        }

        return redirect()->route('back.subscribers.index')->withSuccess(__('Email Sent Successfully.'));

    }
    public function delete($id)
    {
        Subscriber::findOrFail($id)->delete();
        return redirect()->route('back.subscribers.index')->withSuccess(__('Email Delete Successfully.'));
    }


}
