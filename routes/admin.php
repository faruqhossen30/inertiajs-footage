<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ChannelController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\ApiKeyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Models\Channel;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboarController::class, 'index'])->name('dashboard');
    Route::resource('role',  RoleController::class);
    Route::resource('admin', AdminController::class);

    Route::resource('category', CategoryController::class);
    Route::resource('channel', ChannelController::class);
    Route::resource('api-key', ApiKeyController::class);
    Route::resource('video', VideoController::class);

    Route::resource('role',  RoleController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
