<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'answers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question_id', 
        'content', 
        'media_id', 
        'is_correct'
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
   public function getQuestion(): BelongsTo
   {
       return $this->belongsTo(Question::class, 'question_id');
   }
}
