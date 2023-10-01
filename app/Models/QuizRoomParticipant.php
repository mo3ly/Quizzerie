<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizRoomParticipant extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'quiz_room_participants';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'room_id', 
        'user_id', 
        'nickname', 
        'streak_counter', 
        'has_left',
        'is_blocked'
    ];
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function getRoom()
    {
        return $this->belongsTo(Quiz::class, 'room_id', 'id');
    }
}
