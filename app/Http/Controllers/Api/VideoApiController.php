<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoApiController extends Controller
{
    public function storeStoryBlocksVideo(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'file_path' => 'required|string',
            'duration' => 'nullable'
        ]);

        $keywords = array_filter(array_unique(array_map(function ($t) {
            return trim($t);
        }, explode(',', $request->keywords))));


        $targetVideo = Video::create([
            'title' => $request->title,
            'povider'    => 'storyblocks',
            'povider_id' => 123,
            'file_name'  => $request->file_name,
            'file_path'  => 'videos/' . $request->file_name,
            'thumbnail'  => $request->thumbnail,
            'width'      => null,
            'height'     => null,
            'size'       => null,
            'duration'   => $request->duration,
            'video_quality'   => $request->video_quality,
        ]);
        return $request->all();
    }
}
