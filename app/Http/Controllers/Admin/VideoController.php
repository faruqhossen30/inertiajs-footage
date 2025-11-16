<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\DownloadVideo;
use App\Models\Template;
use App\Models\Video;
use App\Models\Tag;
use App\Models\VideoTemplate;
use App\Models\VideoTemplateFootage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
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
        $show = null;
        if (isset($_GET['show']) && $_GET['show']) {
            $show = $_GET['show'];
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
            'order'=> 'popular',
            'page'=> 1,
            'per_page'=> $show ?? 10,
        ];

        $queryParams =  http_build_query($params);
        $url = "https://pixabay.com/api/videos/?{$queryParams}";
        $response = Http::get($url);
        $data = $response->json();

        // return $data['hits'];



        return Inertia::render('Admin/Video/PixabayVideos', ['items' => $data['hits']]);
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

            if (!$targetVideo) {
                $targetVideo = Video::create([
                    'povider'=> $provider,
                    'povider_id' => $video['id'],
                    'file_name' => $video['url'],
                    'thumbnail' => $video['thumbnail'],
                    'width' => $video['width'],
                    'height' => $video['height'],
                    'size' => $video['size'] ?? null,
                    'duration' => $video['duration'] ?? null
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
                    $slug = $baseSlug.'-'.$i;
                    $i++;
                }

                $tag = Tag::create([
                    'name' => $name,
                    'slug' => $slug,
                    'status' => true,
                ]);
                $tagIds[] = $tag->id;
            }

            if (!empty($tagIds)) {
                $targetVideo->tags()->syncWithoutDetaching($tagIds);
            }
        }

        return "store";
    }

    public function store(Request $request)
    {
        
    }

    /**
     * Enqueue pending video downloads to queue and return a JSON response.
     */
    public function enqueueDownloads(Request $request)
    {
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Video::where('id', $id)->delete();
        return redirect()->route('video.index');

    }
}
