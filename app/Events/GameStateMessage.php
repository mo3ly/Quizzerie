<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameStateMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    //protected  $user;
    protected  $gameId;
    protected  $message;
    protected  $currentQuestion;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(string $gameId, string $message, string $currentQuestion = null)
    {
        //$this->user = $user;
        $this->gameId = $gameId;
        $this->message = $message;
        $this->currentQuestion = $currentQuestion;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel("game.{$this->gameId}");
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            //'user' => $this->user->only('id', 'name'),
            'state' => $this->message,
            'current_question' => $this->currentQuestion
        ];
    }
    
    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'game.state';
    }
}
