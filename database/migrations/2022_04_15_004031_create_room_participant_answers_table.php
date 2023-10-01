<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_participant_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')
                ->constrained('quiz_room_participants')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('answer_id')
                ->constrained('answers')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->double('answer_within');
            $table->integer('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room_participant_answers');
    }
};
