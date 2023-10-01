<?php

use Illuminate\Support\Facades\Broadcast;

// Route::post('/broadcasting/auth', function(Illuminate\Http\Request $req) {
//     if($req->channel_name == 'presence-global'){return ['name'=>'guest'];}
//     return abort(403);
// });

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('game.{id}', function ($user, $id) {
    return $user->only('id', 'name');
});