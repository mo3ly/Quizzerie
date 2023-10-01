<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LobbyController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\GameController;

require __DIR__.'/auth.php';

Route::get('/', function () {
    return ['API Version' => app()->version()];
});


Route::get('/test', [GameController::class, 'test']);

Route::post('/webhooks', WebhookController::class);

