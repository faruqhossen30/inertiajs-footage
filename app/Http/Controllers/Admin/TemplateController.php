<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Template::paginate(10);
        // return $categories;
        return Inertia::render('Admin/Template/Index', ['templates' => $templates]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $path = public_path();
        // return $path;

        // $osName = php_uname('n');   // Operating System name
        // $hostName = gethostname();

        // // return $osName;
        // return $hostName;

        return Inertia::render('Admin/Template/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|max:102400', // 100MB max
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'status' => 'nullable|boolean'
        ]);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status ?? true,
            'pc' => gethostname()
        ];

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->move(public_path('uploads/templates'), $fileName);

            $data['file_name'] = $fileName;
            // $data['file_path'] = 'uploads/templates/' . $fileName;
            $data['file_path'] = $filePath;
        }

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_thumb_' . $thumbnail->getClientOriginalName();
            $thumbnail->move(public_path('uploads/thumbnails'), $thumbnailName);

            $data['thumbnail'] = 'uploads/thumbnails/' . $thumbnailName;
        }

        Template::create($data);

        return to_route('template.index')->with('success', 'Template created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $template = Template::findOrFail($id);
        return Inertia::render('Admin/Template/Edit', ['template' => $template]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $template = Template::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:mp4,avi,mov,wmv,flv,mkv|max:102400', // 100MB max
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'status' => 'nullable|boolean'
        ]);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status ?? $template->status,
        ];

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($template->file_path && file_exists(public_path($template->file_path))) {
                unlink(public_path($template->file_path));
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/templates'), $fileName);

            $data['file_name'] = $fileName;
            $data['file_path'] = 'uploads/templates/' . $fileName;
        }

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($template->thumbnail && file_exists(public_path($template->thumbnail))) {
                unlink(public_path($template->thumbnail));
            }

            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_thumb_' . $thumbnail->getClientOriginalName();
            $thumbnail->move(public_path('uploads/templates'), $thumbnailName);

            $data['thumbnail'] = 'uploads/templates/' . $thumbnailName;
        }

        $template->update($data);

        return to_route('template.index')->with('success', 'Template updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $template = Template::findOrFail($id);

        // Delete associated files
        if ($template->file_path && file_exists(public_path($template->file_path))) {
            unlink(public_path($template->file_path));
        }

        if ($template->thumbnail && file_exists(public_path($template->thumbnail))) {
            unlink(public_path($template->thumbnail));
        }

        $template->delete();

        return redirect()->route('template.index')->with('success', 'Template deleted successfully.');
    }
}
