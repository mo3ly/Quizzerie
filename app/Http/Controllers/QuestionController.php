<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Answer;
use App\Models\Media;

class QuestionController extends Controller
{
    
    public function index(){
        return response()->json(Question::all());
    }
    
    public function show($id)
    {
        $question = Question::find($id);
        if(!empty($question))
            return response()->json($question);
        else
            return response()->json([
                "message" => "Unavailable question!"
            ], 404);
    }

    public function store(Request $request)
    {
        $question = new Question;
        //$question->name = $request->name;
        $question->save();
        return response()->json([
            "message" => "Question Added."
        ], 201);
    }

    public function create(Request $request)
    {
        request()->validate([
            'title' => ['required', 'string', 'max:100'],
            'quiz_id' => ['required', 'integer'],
            // validate answers
            // check the the quiz_id is valid
            // validate the image
        ]);

        $questionImage = null;
        
        if($request->image != 'null'){
            $imageName = time().'.'.$request->image->getClientOriginalExtension();  
            $imagePath = $request->image->storeAs('public/question', $imageName);
            $questionImage = Media::create([
                'title' => 'title',
                'type' => Media::TYPE_IMAGE,
                'path' => '/storage/question/' . $imageName
            ]);
        }

        $questionRecord = Question::create([
            'quiz_id' => $request->quiz_id,
            'content' =>  $request->title,
            'media_id' => $questionImage != null ? $questionImage->id : null,
            'duration' => $request->duration,
            'delay' => 0,
            'order' => 0,
            'points' => $request->points,
        ]);

        $answers = json_decode($request->get('answers'), true);

        foreach($answers as $key=>$answer){
            Answer::create([
                'question_id' => $questionRecord->id,
                'content' => $answer['content'],
                'is_correct' => $answer['isCorrect'],
            ]);
        }

        return response()->json([
            "message" => "Question Added."
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (Question::where('id', $id)->exists()) {
            $question = Question::find($id);
            $book->name = is_null($request->name) ? $book->name : $request->name;
            $book->save();
            return response()->json([
                "message" => "Question Updated."
            ], 404);
        }else{
            return response()->json([
                "message" => "Question Not Found."
            ], 404);
        }
    }

    public function destroy($id)
    {
        if(Question::where('id', $id)->exists()) {
            $question = Question::find($id);
            $question->delete();

            return response()->json([
              "message" => "records deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "Question not found."
            ], 404);
        }
    }
}
