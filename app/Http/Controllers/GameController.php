<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuizRoom;
use App\Events\GameStateMessage;

// test
use Pusher\Pusher;
use App\Events\test;

class GameController extends Controller
{
    /**
     * Brodcast game state
     * 
     */
    public function gameState(Request $request){    
        request()->validate([
            'game_state' => ['required', 'string', 'max:20'],
            'current_question' => ['required', 'integer'],
            'room_token' => ['required', 'string', 'max:50'],
        ]);

        if($request->game_state == QuizRoom::STATE_QUESTION)
            QuizRoom::where('room_token', '=', $request->room_token)->update(['current_state' => $request->game_state, 'current_question' => $request->current_question]);
        else       
            QuizRoom::where('room_token', '=', $request->room_token)->update(['current_state' => $request->game_state]);

        GameStateMessage::broadcast(
            $request->room_token,
            $request->game_state,
            $request->current_question,
        )->toOthers();
    }

    
    /**
     * Brodcast test
     * 
     */
    public function test(Request $request){    
        test::broadcast();
        
        $connection = config( 'broadcasting.connections.pusher' );

        $pusher = new Pusher(
            $connection['key'],
            $connection['secret'],
            $connection['app_id'],
            $connection['options'] ?? []
        );
       
        $channels = $pusher->get_channels();
        $users = $pusher->get('/channels/service-manager/users');

        return $channels;
    }
}
