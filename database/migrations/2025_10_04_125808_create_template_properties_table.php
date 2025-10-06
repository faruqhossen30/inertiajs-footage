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
        Schema::create('template_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained('templates')->onDelete('cascade');
            $table->string('key'); // Property name/key
            $table->text('value')->nullable(); // Property value
            $table->string('type')->default('text'); // Property type (text, number, boolean, etc.)
            $table->integer('sort_order')->default(0); // For ordering properties
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['template_id', 'key']);
            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_properties');
    }
};
