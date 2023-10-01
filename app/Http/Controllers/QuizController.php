<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Media;
use App\Http\Resources\QuizResourceCollection;

// Resource: https://www.codewolfy.com/blog/laravel-simple-restful-api-tutorial
class QuizController extends Controller
{
    public function index(){
        return new QuizResourceCollection(Quiz::where('user_id', auth()->id())->orderBy('id', 'DESC')->get());
    }
    
    public function show($id)
    {
        $quiz = Quiz::where('id' , '=', $id)->get();
        if(!empty($quiz))
            return new QuizResourceCollection($quiz);
        else
            return response()->json([
                "message" => "Quiz not found"
            ], 404);
    }

    public function create(Request $request)
    {
        // refactor the code later
        request()->validate([
            'quiz_title' => ['required', 'string', 'max:100'],
            'quiz_description' => ['string', 'max:100'],
            // add validation for questions and answers
            // validate the image
        ]);

        $image = null;

        if($request->get('quiz_image') != 'null'){
            $imageName = time().'.'.$request->quiz_image->getClientOriginalExtension();  

            $imagePath = $request->quiz_image->storeAs('public/quiz', $imageName);
    
            $image = Media::create([
                'title' => 'title',
                'type' => Media::TYPE_IMAGE,
                'path' => '/storage/quiz/' . $imageName
            ]);
        }

        $quiz = Quiz::create([
            'user_id' => $request->user()->id,
            'title' => $request->quiz_title,
            'media_id' => $image != null ? $image->id : null,
            'description' =>  $request->quiz_description ?? null,
            'language_code' =>  "EN",
        ]);

        return response()->json([
            "quiz_id" => $quiz->id
        ], 201);
    }

    public function store(Request $request)
    {
        $quiz = new Quiz;
        //$quiz->name = $request->name;
        $quiz->save();
        return response()->json([
            "message" => "Quiz Added."
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (Quiz::where('id', $id)->exists()) {
            $quiz = Books::find($id);
            $book->name = is_null($request->name) ? $book->name : $request->name;
            $book->save();
            return response()->json([
                "message" => "Quiz Updated."
            ], 404);
        }else{
            return response()->json([
                "message" => "Quiz Not Found."
            ], 404);
        }
    }

    public static function destroy($id)
    {
        if(Quiz::where('id', $id)->exists()) {
            $quiz = Quiz::find($id);
            $quiz->delete();

            return response()->json([
              "message" => "records deleted."
            ], 202);
        } else {
            return response()->json([
              "message" => "Quiz not found."
            ], 404);
        }
    }
}
