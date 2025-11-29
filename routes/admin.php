<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\ApiKeyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboarController::class, 'index'])->name('dashboard');
    Route::resource('role', RoleController::class);
    Route::resource('admin', AdminController::class);

    Route::resource('category', CategoryController::class);
    Route::resource('api-key', ApiKeyController::class);

    Route::get('video', [VideoController::class, 'index'])->name('video.index');
    Route::get('video/create', [VideoController::class, 'create'])->name('video.create');
    Route::post('video', [VideoController::class, 'pixabayStore'])->name('video.pixabay.store');
    Route::post('video/enqueue', [VideoController::class, 'enqueueDownloads'])->name('video.enqueue');

    Route::resource('role', RoleController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('test', [TestController::class, 'index']);
});

require __DIR__.'/auth.php';
