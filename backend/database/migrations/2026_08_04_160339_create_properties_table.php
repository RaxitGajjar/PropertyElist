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
        Schema::create('properties', function (Blueprint $table) {

            $table->id();

            // Project Information
            $table->string('project_name');
            $table->string('title');
            $table->string('builder_name')->nullable();

            // Location
            $table->string('city');
            $table->string('location');
            $table->text('address')->nullable();
            $table->text('google_map')->nullable();

            // Pricing
            $table->decimal('price', 15, 2);
            $table->string('area')->nullable();

            // Property Details
            $table->string('property_type');
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();

            // Project Status
            $table->enum('project_status', [
                'New Launch',
                'Under Construction',
                'Ready to Move'
            ]);

            $table->date('possession_date')->nullable();

            // Featured
            $table->boolean('featured')->default(false);

            // Legal
            $table->string('rera_number')->nullable();

            // Media
            $table->string('brochure')->nullable();
            $table->string('floor_plan')->nullable();
            $table->string('youtube_link')->nullable();

            // Description
            $table->longText('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
