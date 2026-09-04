<?php

use App\Http\Controllers\ClickController;
use Illuminate\Support\Facades\Route;

// Smart Affiliate Tracker & Redirection (tracks click and forwards to Amazon)
Route::get('/go/{id}', [ClickController::class, 'redirect'])->name('affiliate.go');

// Serve Storefront SPA View
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api|go).*$');
