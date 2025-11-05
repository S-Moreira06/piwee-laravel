<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;

Route::get('/api/cart/count', [CartController::class, 'getCount']);
Route::get('/api/categories', [CategoryController::class, 'getAll']);
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
Route::get('/gcu', function () {
    return Inertia::render('gcu');
})->name('gcu');
Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');
Route::get('/cookie', function () {
    return Inertia::render('cookie');
})->name('cookie');



Route::prefix('category')->name('category.')->controller(CategoryController::class)->group(function () {
    Route::get('/{id}', 'category')->name('index');
});

Route::prefix('details')->name('details')->controller(ItemsController::class)->group(function () {
    Route::get('/{id}', 'details')->name('item');
});



Route::middleware('auth')->prefix('cart')->name('cart.')->controller(CartController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/add/{id}', 'addToCart')->name('add');
    Route::post('/remove/{id}', 'removeFromCart')->name('remove');
    Route::post('/clear', 'clearCart')->name('clear');
    Route::post('/increment', 'increment')->name('increment');
    Route::post('/decrement', 'decrement')->name('decrement');
});

// Route::post('/order', [OrderController::class, 'store'])->name('order.store');
Route::middleware('auth')->prefix('checkout')->name('checkout.')->controller(CheckoutController::class)->group(function () {
    Route::get('/confirm', 'showCheckout')->name('confirm');
    Route::post('/process', 'processCheckout')->name('process');
    Route::post('/payment', 'confirmPayment')->name('payment');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
