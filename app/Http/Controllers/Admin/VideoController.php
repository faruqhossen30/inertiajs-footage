<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\DownloadVideo;
use App\Models\Tag;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
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
        $per_page = null;
        if (isset($_GET['per_page']) && $_GET['per_page']) {
            $per_page = $_GET['per_page'];
        }

        $page = null;
        if (isset($_GET['page']) && $_GET['page']) {
            $page = $_GET['page'];
        }

        $order = null;
        if (isset($_GET['order']) && $_GET['order']) {
            $order = $_GET['order'];
        }


        $search = null;
        if (isset($_GET['search']) && $_GET['search']) {
            $search = $_GET['search'];
        }

        $provider = null;
        if (isset($_GET['provider']) && $_GET['provider']) {
            $provider = $_GET['provider'];
        }

        $key = env('PIXABAY_API_KEY');
        $query = $search;

        $params = [
            'key' => $key,
            'q' => $search,
            'order' => $order ?? 'popular',
            'page' => $page ?? 1,
            'per_page' => $per_page ?? 10,
        ];

        $queryParams = http_build_query($params);
        $url = "https://pixabay.com/api/videos/?{$queryParams}";
        $response = Http::get($url);
        $data = $response->json();

        $data['hits'];
        $ids = collect($data['hits'])->pluck('id')->toArray();

        $existIds = Video::whereIn('povider_id', $ids)->pluck('povider_id')->toArray();

        // return $data;


        return Inertia::render(
            'Admin/Video/PixabayVideos',
            [
                'items' => $data['hits'],
                'existIds' => $existIds,
                'totalHits' => $data['totalHits'],
            ]
        );
    }

    public function pixabayStore(Request $request)
    {
        $provider = 'pixabay';
        $videos = $request->videos;

        foreach ($videos as $video) {
            $keywords = array_filter(array_unique(array_map(function ($t) {
                return trim($t);
            }, explode(',', $video['tags']))));

            // Find existing video by provider and provider_id; create if not found
            $targetVideo = Video::where('povider', $provider)
                ->where('povider_id', $video['id'])
                ->first();

            if (! $targetVideo) {
                $targetVideo = Video::create([
                    'povider' => $provider,
                    'povider_id' => $video['id'],
                    'file_name' => $video['url'],
                    'thumbnail' => $video['thumbnail'],
                    'width' => $video['width'],
                    'height' => $video['height'],
                    'size' => $video['size'] ?? null,
                    'duration' => $video['duration'] ?? null,
                ]);
            }

            $tagIds = [];
            foreach ($keywords as $name) {
                if ($name === '') {
                    continue;
                }

                $existingByName = Tag::where('name', $name)->first();
                if ($existingByName) {
                    $tagIds[] = $existingByName->id;

                    continue;
                }

                $baseSlug = Str::slug($name);
                $slug = $baseSlug;
                $i = 1;
                while (Tag::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $i;
                    $i++;
                }

                $tag = Tag::create([
                    'name' => $name,
                    'slug' => $slug,
                    'status' => true,
                ]);
                $tagIds[] = $tag->id;
            }

            if (! empty($tagIds)) {
                $targetVideo->tags()->syncWithoutDetaching($tagIds);
            }
        }

        return  to_route('video.index');
    }

    public function store(Request $request) {}

    /**
     * Enqueue pending video downloads to queue and return a JSON response.
     */
    public function enqueueDownloads(Request $request)
    {
        // Reset the stop flag so downloads can proceed
        \Illuminate\Support\Facades\Cache::forget('stop_video_downloads');

        $videos = Video::query()
            ->where('status', 'list')
            ->orderBy('id')
            ->get();

        if ($videos->isEmpty()) {
            return back()->with('success', 'No pending videos to enqueue.');
        }

        $jobs = [];
        foreach ($videos as $video) {
            $jobs[] = new DownloadVideo($video->id);
        }

        Bus::chain($jobs)->dispatch();

        return back()->with('success', 'Enqueued ' . count($jobs) . ' video downloads.');
    }

    /**
     * Stop all pending downloads and clear the queue.
     */
    public function stopDownloads()
    {
        // Set a flag to stop any running chains
        \Illuminate\Support\Facades\Cache::forever('stop_video_downloads', true);

        // Clear the jobs table (assuming database driver)
        \Illuminate\Support\Facades\DB::table('jobs')->delete();

        // Reset 'run' status videos back to 'list' so they can be re-queued later
        Video::where('status', 'run')->update(['status' => 'list']);

        return back()->with('success', 'All downloads stopped and queue cleared.');
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
