<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;

class AnswerController extends Controller
{
    public function index(){
        return response()->json(Answer::all());
    }
    
    public function show($id)
    {
        $answer = Answer::find($id);
        if(!empty($answer))
            return response()->json($answer);
        else
            return response()->json([
                "message" => "Answer not found"
            ], 404);
    }

    public function store(Request $request)
    {
        $answer = new Answer;
        //$answer->name = $request->name;
        $answer->save();
        return response()->json([
            "message" => "Answer Added."
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (Answer::where('id', $id)->exists()) {
            $answer = Answer::find($id);
            $book->name = is_null($request->name) ? $book->name : $request->name;
            $book->save();
            return response()->json([
                "message" => "Answer Updated."
            ], 404);
        }else{
            return response()->json([
                "message" => "Answer Not Found."
            ], 404);
        }
    }

    public function destroy($id)
    {
        if(Answer::where('id', $id)->exists()) {
            $answer = Answer::find($id);
            $answer->delete();

            return response()->json([
              "message" => "records deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "Answer not found."
            ], 404);
        }
    }
}
