<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    const POINTS_NONE = 0;
    const POINTS_NORMAL = 1;
    const POINTS_DOUBLE = 2;
    
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'questions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quiz_id', 
        'content', 
        'media_id', 
        'duration', 
        'delay', 
        'order',
        'points',
        'is_enabled'
    ];

    /**
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
   public function getMedia()
   {
       return $this->belongsTo(Media::class, 'media_id', 'id');
   }

   /**
    * 
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
   public function getQuiz()
   {
       return $this->belongsTo(Quiz::class, 'quiz_id');
   }

   
    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function getAnswers()
    {
        return $this->hasMany(Answer::class, 'question_id', 'id');
    }
}
