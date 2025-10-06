<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ChannelController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\PropertyTypeController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\TemplatePropertyController;
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
    Route::resource('template', TemplateController::class);
    Route::resource('property-type', PropertyTypeController::class)->names([
        'index' => 'admin.property.type.index',
        'create' => 'admin.property.type.create',
        'store' => 'admin.property.type.store',
        'show' => 'admin.property.type.show',
        'edit' => 'admin.property.type.edit',
        'update' => 'admin.property.type.update',
        'destroy' => 'admin.property.type.destroy',
    ]);
    Route::resource('template-property', TemplatePropertyController::class)->names([
        'index' => 'admin.template.property.index',
        'create' => 'admin.template.property.create',
        'store' => 'admin.template.property.store',
        'show' => 'admin.template.property.show',
        'edit' => 'admin.template.property.edit',
        'update' => 'admin.template.property.update',
        'destroy' => 'admin.template.property.destroy',
    ]);
    Route::resource('channel', ChannelController::class);
    Route::resource('api-key', ApiKeyController::class);
    Route::resource('video', VideoController::class);

    // Additional routes for PropertyType
    Route::patch('property-type/{property_type}/toggle-status', [PropertyTypeController::class, 'toggleStatus'])
        ->name('admin.property.type.toggle-status');

    // Additional routes for TemplateProperty
    Route::post('template-property/update-sort-order', [TemplatePropertyController::class, 'updateSortOrder'])
        ->name('admin.template.property.update-sort-order');

    Route::resource('role',  RoleController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
