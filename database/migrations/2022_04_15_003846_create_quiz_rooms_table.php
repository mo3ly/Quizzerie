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
        Schema::create('quiz_rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')
                  ->constrained('quizzes')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');
            $table->integer('maximum_users');
            $table->integer('room_pin')->nullable();
            $table->string('room_token')->nullable(); // url to join the game
            $table->string('current_state')->nullable();
            $table->integer('current_question'); // use this to validate user's answer request
            $table->boolean('receive_answers')->default(false); // use it to deccided wheather it is to recieve answers or not
            $table->boolean('is_locked')->default(false);
            $table->boolean('has_ended')->default(false);
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
        Schema::dropIfExists('quiz_rooms');
    }
};
