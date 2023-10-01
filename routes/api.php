<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{QuizController, 
    QuestionController, 
    QuizRoomController,
    PlayerController,
    GameController};
    
//Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {

    // quiz routes
    Route::resource('/quiz', QuizController::class);
    Route::post('/quiz/create', [QuizController::class, 'create']);

    // question routes
    Route::post('/question/create', [QuestionController::class, 'create']);

    // quiz room routes
    Route::resource('/room', QuizRoomController::class);
    Route::controller(QuizRoomController::class)->group(function () {
        Route::post('/room/validate-host/{token}', 'isValidHost');
        Route::post('/room/validate/{token}', 'isValidRoom');
        Route::post('/room/request-pin/{token}', 'requestPin');
        Route::post('/room/join', 'isValidPin');
    });

    // (game) quiz room routes
    Route::controller(GameController::class)->group(function () {
        Route::post('/room/game/state', 'gameState');
    });

    // (player) quiz room routes
    Route::controller(PlayerController::class)->group(function () {
        Route::post('/room/player/nickname-validate', 'isValidNickname');
        Route::post('/room/player/nickname-request', 'requestNickname');
        Route::post('/room/player/answer-request', 'requestAnswer');
    });

});