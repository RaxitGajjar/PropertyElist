<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [

        // Project Information
        'project_name',
        'title',
        'builder_name',

        // Location
        'city',
        'location',
        'address',
        'google_map',

        // Pricing
        'price',
        'area',

        // Property Details
        'property_type',
        'bedrooms',
        'bathrooms',

        // Project Status
        'project_status',
        'possession_date',

        // Featured
        'featured',

        // Legal
        'rera_number',

        // Description
        'description',

        // Media
        'brochure',
        'floor_plan',
        'youtube_link',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'possession_date' => 'date',
    ];

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }
}
