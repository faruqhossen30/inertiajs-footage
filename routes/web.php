<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PixabayController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Pixabay API Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('pixabay')->name('pixabay.')->group(function () {
        Route::get('/', [PixabayController::class, 'index'])->name('index');
        Route::post('/search', [PixabayController::class, 'search'])->name('search');
        Route::post('/search-query', [PixabayController::class, 'searchByQuery'])->name('search.query');
        Route::post('/category/{category}', [PixabayController::class, 'getByCategory'])->name('category');
        Route::post('/high-quality', [PixabayController::class, 'getHighQuality'])->name('high-quality');
        Route::post('/download', [PixabayController::class, 'downloadImage'])->name('download');
        Route::post('/download-multiple', [PixabayController::class, 'downloadMultiple'])->name('download.multiple');
        Route::get('/info', [PixabayController::class, 'info'])->name('info');
    });
});

require __DIR__.'/admin.php';
