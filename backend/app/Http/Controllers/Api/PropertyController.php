<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index()
    {
        return Property::with('images')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name'      => 'required|string|max:255',
            'title'             => 'required|string|max:255',
            'builder_name'      => 'nullable|string|max:255',

            'city'              => 'required|string|max:255',
            'location'          => 'required|string|max:255',
            'address'           => 'nullable|string',
            'google_map'        => 'nullable|string',

            'price'             => 'required|numeric',
            'area'              => 'nullable|string',

            'property_type'     => 'required|string|max:255',
            'bedrooms'          => 'nullable|string|max:255',
            'bathrooms'         => 'nullable|string|max:255',

            'project_status'    => 'required|string',
            'possession_date'   => 'nullable|date',

            'featured'          => 'nullable|boolean',

            'rera_number'       => 'nullable|string|max:255',

            'description'       => 'nullable|string',

            'brochure'          => 'nullable|string',
            'floor_plan'        => 'nullable|string',
            'youtube_link'      => 'nullable|string',
        ]);

        $property = Property::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Property Added Successfully',
            'property' => $property
        ], 201);
    }

    public function show($id)
    {
        return Property::with('images')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        $validated = $request->validate([
            'project_name'      => 'required|string|max:255',
            'title'             => 'required|string|max:255',
            'builder_name'      => 'nullable|string|max:255',

            'city'              => 'required|string|max:255',
            'location'          => 'required|string|max:255',
            'address'           => 'nullable|string',
            'google_map'        => 'nullable|string',

            'price'             => 'required|numeric',
            'area'              => 'nullable|string',

            'property_type'     => 'required|string|max:255',
            'bedrooms'          => 'nullable|string|max:255',
            'bathrooms'         => 'nullable|string|max:255',

            'project_status'    => 'required|string',
            'possession_date'   => 'nullable|date',

            'featured'          => 'nullable|boolean',

            'rera_number'       => 'nullable|string|max:255',

            'description'       => 'nullable|string',

            'brochure'          => 'nullable|string',
            'floor_plan'        => 'nullable|string',
            'youtube_link'      => 'nullable|string',
        ]);

        $property->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Property Updated Successfully',
            'property' => $property
        ]);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);

        $property->delete();

        return response()->json([
            'success' => true,
            'message' => 'Property Deleted Successfully'
        ]);
    }
}
