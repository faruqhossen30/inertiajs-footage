<?php

use App\Models\Template;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('videos', function(){
    $videos = Video::with(['templates.template'])->paginate();
    return response()->json($videos);
});

Route::get('templates', function(){
    $videos = Template::with('properties')->paginate();
    return response()->json($videos);
});
