<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\CartController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::prefix('details')->name('details')->controller(ItemsController::class)->group(function () {
    Route::get('/{id}', 'details')->name('item');
});

Route::prefix('cart')->name('cart.')->controller(CartController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/add/{id}', 'addToCart')->name('add');
    Route::post('/remove/{id}', 'removeFromCart')->name('remove');
    Route::post('/clear', 'clearCart')->name('clear');
    // Route::post('/update', 'updateCart')->name('update');
});

