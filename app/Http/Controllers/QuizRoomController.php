<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Quiz;
use App\Models\QuizRoom;
use App\Models\QuizRoomParticipant;

class QuizRoomController extends Controller
{
    public function index(){
        return response()->json(QuizRoom::all());
    }
    
    public function show($id)
    {
        $room = QuizRoom::find($id);
        if(!empty($room))
            return response()->json($room);
        else
            return response()->json(["message" => "Unavailable room!"], 404);
    }

    public function store(Request $request)
    {
        // validate quiz id from the request
        request()->validate([
            'quiz_id' => ['required', 'integer'],
        ]);

        $quiz = Quiz::find($request->quiz_id);
        // check if user has created a room in the last 5 minutes then make a delay
        // check that the user is not running a quiz now!
        if(!empty($quiz) && empty(QuizRoom::firstWhere([['has_ended', 0], ['quiz_id', $quiz->id]]))){

            $quizRoom = QuizRoom::create([
                'quiz_id' => $request->quiz_id,
                'maximum_users' => 20,
                'room_pin' => null,
                'room_token' => Str::random(20),
                'current_state' => QuizRoom::STATE_LOBBY,
                'current_question' => 0,
            ]);

            if($quizRoom)
            return response()->json(["room_token" => $quizRoom->room_token], 201);
            else return response()->json(["message" => "Couldn't create a room, try again later!"], 404);
        }
        else
        return response()->json(["message" => "Couldn't create a room, try again later!"], 404);
    }

    public function update(Request $request, $id)
    {
        if (QuizRoom::where('id', $id)->exists()) {
            $quizRoom = QuizRoom::find($id);
            $quizRoom->current_question = is_null($request->current_question) ? $quizRoom->current_question : $request->current_question;
            $quizRoom->save();
            return response()->json(["message" => "QuizRoom Updated."], 404);
        }else{
            return response()->json(["message" => "QuizRoom Not Found."], 404);
        }
    }

    public function destroy($id)
    {
        if(QuizRoom::where('id', $id)->exists()) {
            $quizRoom = QuizRoom::find($id);
            $quizRoom->delete();

            return response()->json(["message" => "Room has been deleted."], 202);
        } else {
            return response()->json(["message" => "Room is not found."], 404);
        }
    }

    /**
     * Checks if the request token is a valid host for the quiz room
     * 
     */
    public function isValidHost(Request $request, $token)
    {
        // make a different route to validate users rooms
        // so they can join the quiz page with the same token as the creator
        $room = QuizRoom::where([
            ['room_token', '=', $token],
            ['has_ended', '=', 0],
        ])->first();

        if($room && $room->getQuiz->getUser->id == $request->user()->id)
            return response()->json(['host_id' => $request->user()->id, 'quiz_id' => $room->quiz_id]);
        else
            return response()->json([ "message" => "Expired room!"], 404);
    }

    /**
     * Checks if the request token is a valid game
     * 
     */
    public function isValidRoom(Request $request, $token)
    {
        $room = QuizRoom::where([
            ['room_token', '=', $token],
            ['has_ended', '=', 0],
        ])->first();

        if($room)
            return response()->json(['user_id' => $request->user()->id, 'host_id' => $room->getQuiz->getUser->id]);
        else
            return response()->json([ "message" => "Expired room!"], 404);
    }
    

    /**
     * generate a pin number for a specified room
     * 
     */
    public function requestPin(Request $request, $token)
    {
        $room = QuizRoom::where([
            ['room_token', '=', $token],
            // check that this user is the room owner
            ['has_ended', '=', 0],
        ])->first();


        if($room && $room->getQuiz->getUser->id == $request->user()->id){
            $gamePIN = rand(1000000, 9999999);
            $room->update(['room_pin' => $gamePIN]);
            return response()->json(["room_pin" => $room->room_pin], 201);
        }
        else
            return response()->json([ "message" => "Invalid room."], 404);
    }

    /**
     * Checks if the request pin has a valid active quiz room
     * 
     */
    public function isValidPin(Request $request)
    {
        request()->validate([
            'room_pin' => ['required', 'integer'],
        ]);

        $room = QuizRoom::where([
            ['room_pin', '=', (int)$request->room_pin],
            ['has_ended', '=', 0],
        ])->first();

        if($room)
            return response()->json(["room_token" => $room->room_token], 201);
        else
            return response()->json([ "message" => "Invalid pin."], 404);
    }

    /**
     * This event is fired when a user occupies the channel
     * 
     */
    public function onChannelOccupied($token)
    {
        //QuizRoom::where('room_token', '=', $token)->update(['room_pin' => rand(1000000, 9999999)]);
    }

    /**
     * This event is fired when the channel is empty
     * 
     */
    public function onChannelVacated($token)
    {
        QuizRoom::where('room_token', '=', $token)->update(['has_ended' => 1]);
    }
    
    /**
     * This event is fired when a user joins the channel
     * 
     */
    public function onMemeberAdded($token, $userId)
    {
        $room = QuizRoom::where('room_token', '=', $token)->first();
        if($room){
            $participant = QuizRoomParticipant::where([
                ['room_id', '=', $room->id],
                ['user_id', '=', $userId],
            ])->first();

            if($participant){
                QuizRoomParticipant::where('id', '=', $participant->id)->update(['has_left' => 0]);
            } else {
                QuizRoomParticipant::Create([
                    'room_id' => $room->id,
                    'user_id' => $userId,
                    'nickname' => null,
                    'streak_counter' => 0,
                    'has_left' => false,
                    'is_blocked' => false,
                ]);
            }
        }
    }

    /**
     * This event is fired when a user leaves the channel
     * 
     */
    public function onMemeberRemoved($token, $userId)
    {
        $room = QuizRoom::where('room_token', '=', $token)->first();
        if($room){
            QuizRoomParticipant::where([
                ['room_id', '=', $room->id],
                ['user_id', '=', $userId],
            ])->update(['has_left' => 1]);
        }
    }

    /* 
     * Get the connected players for a specific channel
     */
    public function getConnectedPlayer($channel)
    {
        $connection = config( 'broadcasting.connections.pusher' );

        $pusher = new Pusher(
            $connection['key'],
            $connection['secret'],
            $connection['app_id'],
            $connection['options'] ?? []
        );
       
        $channels = $pusher->get_channels();
        $users = $pusher->get('/channels/'+ $channel +'users');

        return $users;
    }
}
