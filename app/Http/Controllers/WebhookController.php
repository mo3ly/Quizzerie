<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\QuizRoomController;

class WebhookController extends Controller
{
    /**
     * https://pusher.com/docs/channels/server_api/webhooks/
     * 
     */
    public function __invoke(Request $request)
    {
        $secret = config("broadcasting.connections.pusher.secret");
        $webhook_signature = $request->header("X_PUSHER_SIGNATURE");
    
        $body = $request->all();
    
        $expected_signature = hash_hmac("sha256", json_encode($body), $secret, false);
        if($webhook_signature == $expected_signature) {

            foreach($body['events'] as $event) {
                $roomController = new QuizRoomController;
                $channelToken = explode('.', $event['channel'])[1];
                
                switch($event['name']) {
                    case 'member_added':
                        $roomController->onMemeberAdded($channelToken, $event['user_id']);
                        break;
                    case 'member_removed':
                        $roomController->onMemeberRemoved($channelToken, $event['user_id']);
                        break;
                    case 'channel_occupied':
                        $roomController->onChannelOccupied($channelToken);
                        break;
                    case 'channel_vacated':
                        $roomController->onChannelVacated($channelToken);
                        break;
                    case 'client_event':
                        \Log::info($event);
                        break;
                }

            }

            return Response::json([200]);
        } else {
            return abort(401);
        }
    }
}
