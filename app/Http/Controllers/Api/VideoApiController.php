<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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


        // Find existing video by provider and provider_id; create if not found
        $targetVideo = Video::where('povider_id', $request->assetId)
            ->first();

        if (! $targetVideo) {
            $targetVideo = Video::create([
                'title' => $request->title,
                'povider'    => 'storyblocks',
                'povider_id' => $request->assetId,
                'file_name'  => $request->file_name,
                'file_path'  => 'videos/' . $request->file_name,
                'thumbnail'  => $request->thumbnail,
                'width'      => null,
                'height'     => null,
                'size'       => null,
                'duration'   => $request->duration,
                'video_quality'   => $request->video_quality,
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

        return $request->all();
    }
}
