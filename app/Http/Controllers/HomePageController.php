<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function homePage(Request $request)
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

        $videos = Video::with('tags')
            ->where('status', 'done')
            ->latest('id')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('tags', function ($tagsQuery) use ($search) {
                    $tagsQuery->where('name', 'like', '%' . $search . '%');
                });
            })
            ->paginate(16);

        // Attach accessible file URLs for frontend playback
        $videos->getCollection()->transform(function ($video) {
            $video->file_url = $video->file_path ? Storage::url($video->file_path) : null;
            return $video;
        });

        return Inertia::render('HomePage', ['videos' => $videos]);
    }
}
