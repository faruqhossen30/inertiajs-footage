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
        Schema::create('video_template_footages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->constrained('videos')->cascadeOnDelete();
            $table->foreignId('video_template_id')->constrained('video_templates')->cascadeOnDelete();
            $table->integer('serial_number')->default(0);
            $table->string('keyword');
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
        Schema::dropIfExists('video_template_footages');
    }
};
