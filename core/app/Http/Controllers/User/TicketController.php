<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use PhpParser\Node\Expr\New_;

class TicketController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('localize');
    }

    public function ticket()
    {
        $tickets = Ticket::where('user_id',Auth::user()->id)->get();
        return view('user.dashboard.ticket',compact('tickets'));
    }

    public function ticketNew()
    {
        return view('user.dashboard.ticket-new');
    }

    public function ticketView($id)
    {
        $ticket = Ticket::findOrFail($id);
        return view('user.dashboard.ticket-view',compact('ticket'));
    }

    public function ticketStore(Request $request)
    {
        // validations 
        $request->validate([
            'file' => 'file|mimes:zip|max:5000',
            'message' => 'required|max:255',
            'subject' => 'required|max:255'
        ]);
        $input = $request->all();
        $input['user_id'] = Auth::user()->id;

        // file upload 
        if($request->has('file')){
            $file = $request->file;
            $name = time().$file->getClientOriginalName();
            $file->move('assets/files/',$name);
            $input['file'] = $name;
        }
        Ticket::create($input);
        Session::flash('success',__('Ticket Created Successfully.'));
        return redirect()->route('user.ticket');
    }


    public function ticketReply(Request $request)
    {
        $request->validate([
            'message' => 'required|max:255'
        ]);
       $message = new Message();
       $message->ticket_id = $request->ticket_id;
       $message->user_id = Auth::user()->id;
       $message->message = $request->message;
       $message->save();
       Session::flash('success',__('Reply Send Successfully.'));
       return redirect()->back();
    }


    public function ticketDelete($id)
    {
        if(Ticket::whereId($id)->where('user_id',Auth::user()->id)->exists()){
            $ticket = Ticket::findOrFail($id);
            $messages = $ticket->messages;
            if($messages->count() > 0){
                foreach($messages as $message){
                    $message->delete();
                }
            }
            if($ticket->file){
                unlink(resource_path().('/assets/files/'.$ticket->file));
            }
            $ticket->delete();
            Session::flash('success',__('Ticket Delete Successfully.'));
            return redirect()->back();
        }
    }
}
