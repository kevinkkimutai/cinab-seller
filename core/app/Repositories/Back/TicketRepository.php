<?php

namespace App\Repositories\Back;

use App\{
    Models\Ticket,
    Helpers\ImageHelper
};
use App\Models\Message;
use App\Models\User;

class TicketRepository
{



    /**
     * Update post.
     *
     * @param  \App\Http\Requests\ImageUpdateRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        $input['user_id'] = User::where('email',$request->email)->first()->id;
        if ($file = $request->file('file')) {
            $input['file'] = ImageHelper::handleUploadedImage($request->file('file'),'assets/files/');
        }
        Ticket::create($input);
    }


    public function create()
    {
        return view('back.ticket.create');
    }

    public function update($ticket, $request)
    {
        $ticket->update(['status' => 'Open']);
        $message = new Message();
        $message->ticket_id = $request['ticket_id'];
        $message->user_id = 0;
        $message->message = $request['message'];
        $message->save();
    }

    public function delete($ticket)
    {
        $id = $ticket->id;
        if(Ticket::whereId($id)->exists()){
            $ticket = Ticket::findOrFail($id);
            $messages = $ticket->messages;
            if($messages->count() > 0){
                foreach($messages as $message){
                    $message->delete();
                }
            }
            if($ticket->file){
                ImageHelper::handleDeletedImage($ticket,'file','assets/files/');
            }
            $ticket->delete();
        }
    }


}
