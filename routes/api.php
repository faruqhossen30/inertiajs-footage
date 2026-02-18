<?php

use App\Http\Controllers\Api\VideoApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\SubCategoryApiController;
use App\Http\Controllers\Api\TagApiController;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

use function Illuminate\Log\log;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('videos', function (Request $request) {

    $search = null;
    if (isset($_GET['search']) && $_GET['search']) {
        $search = $_GET['search'];
    }

    $per_page = null;
    if (isset($_GET['per_page']) && $_GET['per_page']) {
        $per_page = $_GET['per_page'];
    }


    $query = Video::query();

    $tagIds = $request->input('tag_ids', []);
    $subcategoryIds = $request->input('subcategory_ids', []);
    $categoryIds = $request->input('category_ids', []);

    if (! empty($tagIds)) {
        $query->whereHas('tags', function ($q) use ($tagIds) {
            $q->whereIn('tags.id', $tagIds);
        });
    } elseif (! empty($subcategoryIds)) {
        $query->whereHas('subCategories', function ($q) use ($subcategoryIds) {
            $q->whereIn('sub_categories.id', $subcategoryIds);
        });
    } elseif (! empty($categoryIds)) {
        $query->whereHas('categories', function ($q) use ($categoryIds) {
            $q->whereIn('categories.id', $categoryIds);
        });
    }


    $videos = $query
        ->paginate($per_page ?? 50)
        ->appends(request()->query());

    return VideoResource::collection($videos);

    // return response()->json($videos);
});

Route::post('video/create', [VideoApiController::class, 'storeStoryBlocksVideo']);

Route::get('categories', [CategoryApiController::class, 'index']);
Route::get('categories/{id}', [CategoryApiController::class, 'show']);

Route::get('sub-categories', [SubCategoryApiController::class, 'index']);
Route::get('sub-categories/{id}', [SubCategoryApiController::class, 'show']);
Route::get('tags', [TagApiController::class, 'index']);
