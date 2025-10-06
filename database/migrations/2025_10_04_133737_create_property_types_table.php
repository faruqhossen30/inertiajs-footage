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
        Schema::create('property_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Display name (e.g., "Text Input", "Color Picker")
            $table->string('slug')->unique(); // Unique identifier (e.g., "text", "color", "range")
            $table->text('description')->nullable(); // Description of the property type
            $table->string('input_type')->default('text'); // HTML input type (text, number, color, range, select, etc.)
            $table->json('validation_rules')->nullable(); // Laravel validation rules
            $table->json('config')->nullable(); // Additional configuration (min/max for range, options for select, etc.)
            $table->boolean('is_active')->default(true); // Whether this type is available for use
            $table->timestamps();
            
            // Add indexes
            $table->index('slug');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_types');
    }
};
