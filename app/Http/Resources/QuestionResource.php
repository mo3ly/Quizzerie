<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\AnswerResourceCollection;

class QuestionResource extends JsonResource
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
            'content' => $this->content,
            'image' => $this->getMedia ? env('APP_URL') . $this->getMedia->path : null,
            'duration' => $this->duration,
            'delay' => $this->delay,
            'points' => $this->points,
            'answers' => $this->getAnswers != null ? new AnswerResourceCollection($this->getAnswers) : null,
        ];
    }
}
