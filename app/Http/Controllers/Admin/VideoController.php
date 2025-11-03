<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\Video;
use App\Models\VideoTemplate;
use App\Models\VideoTemplateFootage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $videos = Video::latest('id')->paginate(10);
        return Inertia::render('Admin/Video/Index', ['videos' => $videos]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Video/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'timeline' => ['required', 'array'],
            'timeline.*.templateId' => ['required', 'integer', 'exists:templates,id'],
            'timeline.*.start' => ['required', 'integer', 'min:0'],
            'timeline.*.duration' => ['required', 'integer', 'min:1'],
            'timeline.*.propertyValues' => ['nullable', 'array'],
            'timeline.*.footages' => ['nullable', 'array'],
        ]);

        // Handle file upload
        //  if ($request->hasFile('file')) {
        //     $file = $request->file('file');
        //     $fileName = time() . '_' . $file->getClientOriginalName();
        //     $filePath = $file->move(public_path('uploads/audios'), $fileName);

        //     $data['file_name'] = $fileName;
        //     // $data['file_path'] = 'uploads/templates/' . $fileName;
        //     $validated['file_path'] = $filePath;

        // }

        $video = Video::create([
            'title' => $validated['title'] ?? null,
        ]);

        $rows = collect($validated['timeline'])
            ->map(function ($item) use ($video) {
                return [
                    'video_id' => $video->id,
                    'template_id' => $item['templateId'],
                    'start' => $item['start'],
                    'duration' => $item['duration'],
                    'properties' => $item['propertyValues'] ?? [],
                    'footages' => $item['footages'] ?? [],
                ];
            })->all();


        // return $rows;


        if (!empty($rows)) {
            // Use relationship so casts handle JSON encoding
            // $video->templates()->createMany($rows);

            foreach ($rows as $row) {
                $videoTemplate = VideoTemplate::create($row);
                foreach ($row['footages'] as $key => $footage) {
                    VideoTemplateFootage::create([
                        'video_id' => $video->id,
                        'video_template_id' => $videoTemplate->id,
                        'serial_number' => $key,
                        'keyword' => $footage['keyword']
                    ]);
                }

                // $video->templates()->add($videoTemplate);
            }
        }

        return redirect()->route('video.index')->with('success', 'Video created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $video = Video::with('templates.footages')->firstWhere('id', $id);
        $footages = $video->templates->flatMap->footages;

        return $footages;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $video = Video::with(['templates' => function ($q) {
            $q->orderBy('start');
        }])->findOrFail($id);

        $templates = Template::with(['properties' => function ($q) {
            $q->ordered()->with('propertyType');
        }])->get();

        return Inertia::render('Admin/Video/Edit', [
            'video' => $video,
            'templates' => $templates,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $video = Video::findOrFail($id);

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'timeline' => ['required', 'array'],
            'timeline.*.templateId' => ['required', 'integer', 'exists:templates,id'],
            'timeline.*.start' => ['required', 'integer', 'min:0'],
            'timeline.*.duration' => ['required', 'integer', 'min:1'],
            'timeline.*.propertyValues' => ['nullable', 'array'],
        ]);

        $video->update([
            'title' => $validated['title'] ?? null,
        ]);

        // Replace existing timeline
        $video->templates()->delete();

        $rows = collect($validated['timeline'])
            ->map(function ($item) {
                return [
                    'template_id' => $item['templateId'],
                    'start' => $item['start'],
                    'duration' => $item['duration'],
                    'properties' => $item['propertyValues'] ?? [],
                ];
            })->all();

        if (!empty($rows)) {
            $video->templates()->createMany($rows);
        }

        return redirect()->route('video.index')->with('success', 'Video updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Video::where('id', $id)->delete();
        return redirect()->route('video.index');
    }
}
