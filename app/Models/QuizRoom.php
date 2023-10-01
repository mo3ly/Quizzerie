<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizRoom extends Model
{
    use HasFactory;

    const STATE_LOBBY = 'LOBBY';
    const STATE_QUESTION = 'QUESTION';

    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'quiz_rooms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quiz_id', 
        'maximum_users', 
        'room_pin', 
        'room_token', 
        'current_state', 
        'current_question', 
        'receive_answers', 
        'is_locked',
        'has_ended'
    ];
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function getQuiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function getParticipants()
    {
        return $this->hasMany(QuizParticipant::class, 'room_id', 'id');
    }
}
