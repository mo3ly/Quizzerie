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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')
                  ->constrained('quizzes')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');
            $table->string('content');
            $table->foreignId('media_id')
                    ->nullable()
                    ->constrained('media')
                    ->onUpdate('cascade')
                    ->onDelete("cascade");
            $table->integer('duration');
            $table->integer('delay');
            $table->integer('order'); // order on preview (in case the user has reordered the questions)
            $table->integer('points')->default(1); // 0 => none, 1 => nomral, 2 => double
            $table->boolean('is_enabled')->default(true);
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
        Schema::dropIfExists('questions');
    }
};
