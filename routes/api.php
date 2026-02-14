<?php

use App\Http\Controllers\Api\VideoApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\SubCategoryApiController;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

use function Illuminate\Log\log;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('videos', function () {

    $search = null;
    if (isset($_GET['search']) && $_GET['search']) {
        $search = $_GET['search'];
    }

    $per_page = null;
    if (isset($_GET['per_page']) && $_GET['per_page']) {
        $per_page = $_GET['per_page'];
    }

    

    $videos = Video::when($search, function ($query) use ($search) {
        $query->
        where('title','like', "%{$search}%")
        ->orWhereHas('tags', function ($tagsQuery) use ($search) {
            $terms = array_filter(explode(' ', $search));
            $tagsQuery->where(function ($q) use ($terms) {
                foreach ($terms as $term) {
                    $q->orWhere('tags.name', 'like', "%{$term}%");
                }
            });
        });
    })
        ->paginate($per_page ?? 10)
        ->appends(request()->query());

        return VideoResource::collection($videos);

    return response()->json($videos);
});

Route::post('video/create', [VideoApiController::class, 'storeStoryBlocksVideo']);

Route::get('categories', [CategoryApiController::class, 'index']);
Route::get('categories/{id}', [CategoryApiController::class, 'show']);

Route::get('sub-categories', [SubCategoryApiController::class, 'index']);
Route::get('sub-categories/{id}', [SubCategoryApiController::class, 'show']);

