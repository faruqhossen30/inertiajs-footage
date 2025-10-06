<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PropertyTypeRequest;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propertyTypes = PropertyType::orderBy('name')
            ->paginate(15);

        return Inertia::render('Admin/PropertyType/Index', [
            'propertyTypes' => $propertyTypes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PropertyType/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PropertyTypeRequest $request)
    {
        PropertyType::create($request->validated());

        return redirect()->route('admin.property.type.index')
            ->with('success', 'Property type created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyType $propertyType)
    {
        $propertyType->load('templateProperties');

        return Inertia::render('Admin/PropertyType/Show', [
            'propertyType' => $propertyType
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PropertyType $propertyType)
    {
        return Inertia::render('Admin/PropertyType/Edit', [
            'propertyType' => $propertyType
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PropertyTypeRequest $request, PropertyType $propertyType)
    {
        $propertyType->update($request->validated());

        return redirect()->route('admin.property.type.index')
            ->with('success', 'Property type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyType $propertyType)
    {
        // Check if property type is being used
        if ($propertyType->templateProperties()->count() > 0) {
            return redirect()->route('admin.property.type.index')
                ->with('error', 'Cannot delete property type that is being used by templates.');
        }

        $propertyType->delete();

        return redirect()->route('admin.property.type.index')
            ->with('success', 'Property type deleted successfully.');
    }

    /**
     * Toggle the active status of a property type.
     */
    public function toggleStatus(PropertyType $propertyType)
    {
        $propertyType->update([
            'is_active' => !$propertyType->is_active
        ]);

        return redirect()->route('admin.property.type.index')
            ->with('success', 'Property type status updated successfully.');
    }
}
