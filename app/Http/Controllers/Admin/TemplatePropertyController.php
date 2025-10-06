<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TemplatePropertyRequest;
use App\Models\PropertyType;
use App\Models\Template;
use App\Models\TemplateProperty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplatePropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TemplateProperty::with(['template', 'propertyType'])
            ->ordered();

        // Filter by template if provided
        if ($request->has('template_id') && $request->template_id) {
            $query->where('template_id', $request->template_id);
        }

        // Filter by property type if provided
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        $templateProperties = $query->paginate(15);

        return Inertia::render('Admin/TemplateProperty/Index', [
            'templateProperties' => $templateProperties,
            'templates' => Template::select('id', 'name')->get(),
            'propertyTypes' => PropertyType::active()->select('slug', 'name')->get(),
            'filters' => $request->only(['template_id', 'type'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $templates = Template::select('id', 'name')->get();
        $propertyTypes = PropertyType::active()->get();

        return Inertia::render('Admin/TemplateProperty/Create', [
            'templates' => $templates,
            'propertyTypes' => $propertyTypes,
            'template_id' => $request->get('template_id')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TemplatePropertyRequest $request)
    {
        TemplateProperty::create($request->validated());

        return redirect()->route('admin.template.property.index')
            ->with('success', 'Template property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TemplateProperty $templateProperty)
    {
        $templateProperty->load(['template', 'propertyType']);

        return Inertia::render('Admin/TemplateProperty/Show', [
            'templateProperty' => $templateProperty
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TemplateProperty $templateProperty)
    {
        $templates = Template::select('id', 'name')->get();
        $propertyTypes = PropertyType::active()->get();

        return Inertia::render('Admin/TemplateProperty/Edit', [
            'templateProperty' => $templateProperty,
            'templates' => $templates,
            'propertyTypes' => $propertyTypes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TemplatePropertyRequest $request, TemplateProperty $templateProperty)
    {
        $templateProperty->update($request->validated());

        return redirect()->route('admin.template.property.index')
            ->with('success', 'Template property updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TemplateProperty $templateProperty)
    {
        $templateProperty->delete();

        return redirect()->route('admin.template.property.index')
            ->with('success', 'Template property deleted successfully.');
    }

    /**
     * Bulk update sort order for template properties.
     */
    public function updateSortOrder(Request $request)
    {
        $request->validate([
            'properties' => 'required|array',
            'properties.*.id' => 'required|exists:template_properties,id',
            'properties.*.sort_order' => 'required|integer'
        ]);

        foreach ($request->properties as $property) {
            TemplateProperty::where('id', $property['id'])
                ->update(['sort_order' => $property['sort_order']]);
        }

        return response()->json(['success' => true]);
    }
}
