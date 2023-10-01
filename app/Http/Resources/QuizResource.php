<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\QuestionResourceCollection;

class QuizResource extends JsonResource
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'cover' => $this->getMedia ? env('APP_URL') . $this->getMedia->path : null,
            'language_code' => $this->language_code,
            'create_at' => $this->created_at,
            'questions' => $this->getQuestions != null ? new QuestionResourceCollection($this->getQuestions) : null,
        ];
    }
}
