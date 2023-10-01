<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizRoom;
use App\Models\QuizRoomParticipant;
use App\Models\RoomParticipantAnswer;

class PlayerController extends Controller
{
    
    /**
     * request a nickname number for a specified user
     * 
     */
    public function isValidNickname(Request $request)
    {
        request()->validate([
            'room_token' => ['required', 'string'],
            'nickname' => ['required', 'string', 'max:30'],
        ]);

        $room = QuizRoom::firstWhere([
            ['room_token', '=', $request->room_token],
            ['has_ended', '=', 0],
        ]);

        if($room && empty(QuizRoomParticipant::firstWhere([['room_id','=',$room->id], ['nickname','=',$request->nickname]])))
            return response()->json(["message" => "success"], 201);
        else
            return response()->json([ "message" => "unavaliable"], 404);
    }

    /**
     * request a nickname number for a specified user
     * 
     */
    public function requestNickname(Request $request)
    {
        request()->validate([
            'room_token' => ['required', 'string'],
            'nickname' => ['required', 'string', 'max:30'],
        ]);

        $room = QuizRoom::where([
            ['room_token', '=', $request->room_token],
            ['has_ended', '=', 0],
        ])->first();

        if($room){
            QuizRoomParticipant::where([['room_id','=', $room->id], ['user_id', '=', $request->user()->id]])->update(['nickname' => $request->nickname]);
            return response()->json(["message" => "success"], 201);
        }
        else
            return response()->json(["message" => "error"], 404);
    }

    
    /**
     * request a nickname number for a specified user
     * 
     */
    public function requestAnswer(Request $request)
    {
        request()->validate([
            'room_token' => ['required', 'string'],
            'user_id' => ['required', 'integer'],
            'answer_id' => ['required', 'integer'],
            'answer_within' => ['required'],//, 'regex:/^\d+(\.\d{1,2})?$/'
            'score' => ['required', 'integer'],
        ]);

        $room = QuizRoom::where([
            ['room_token', '=', $request->room_token],
            ['has_ended', '=', 0],
        ])->first();

        $participant = QuizRoomParticipant::where([
            ['room_id','=', $room->id], 
            ['user_id', '=', $request->user_id]
        ])->first();
        
        // check that this user hasn't a previous answer record
        if(!empty($room) && !empty($participant)){
            $participantAnswer = RoomParticipantAnswer::create([
                'participant_id' => $participant->id,
                'answer_id' => $request->answer_id,
                'answer_within' => $request->answer_within,
                'score' => $request->score,
            ]);
            return response()->json(["message" => "success"], 201);
        }
        else
            return response()->json(["message" => "error"], 404);
    }

}
