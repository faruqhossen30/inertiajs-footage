<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('footages', function (Blueprint $table) {
            $table->id();
            $table->integer('serial_number')->default(0);
            $table->string('keyword');
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->string('file_name')->nullable();
            $table->string('file_path')->nullable();
            $table->string('pc')->nullable();
            $table->enum('status',['list','pending','downloading','downloaded','error'])->default('list');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footages');
    }
};
