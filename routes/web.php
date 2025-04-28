<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::prefix('details')->name('details')->controller(ItemsController::class)->group(function () {
    Route::get('/{id}', 'details')->name('item');
});

Route::prefix('auth')->name('auth.')->controller(AuthController::class)->group(function () {
    Route::get('/login', 'login')->name('login');
    Route::post('/login', 'loginPost')->name('login.post');
    Route::get('/register', 'register')->name('register');
    Route::post('/register', 'registerPost')->name('register.post');
    Route::get('/logout', 'logout')->name('logout');
    Route::get('/password/reset', 'resetPassword')->name('password.reset');
    Route::post('/password/reset', 'resetPasswordPost')->name('password.reset.post');
});

Route::prefix('cart')->name('cart.')->controller(CartController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/add/{id}', 'addToCart')->name('add');
    Route::post('/remove/{id}', 'removeFromCart')->name('remove');
    Route::post('/clear', 'clearCart')->name('clear');
    // Route::post('/update', 'updateCart')->name('update');
});

