<?php

use App\Http\Controllers\ClickController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

// Products API
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Categories API
Route::get('/categories', function () {
    return response()->json([
        'status' => 'success',
        'categories' => Category::where('is_active', true)->orderBy('display_order')->get()
    ]);
});

// Analytics & Stats
Route::get('/stats', [ClickController::class, 'stats']);

// Settings API (Affiliate Tag, etc.)
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/settings', [SettingController::class, 'update']);
