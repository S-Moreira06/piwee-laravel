<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;

// Route::get('/', function () {
//     return Inertia::render('home');
// })->name('home');
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

Route::middleware('auth')->prefix('settings')->name('settings.')->group(function () {
    Route::get('profile', fn() => Inertia::render('settings/profile'))->name('profile');
    Route::get('password', fn() => Inertia::render('settings/password'))->name('password');
    Route::get('appearance', fn() => Inertia::render('settings/appearance'))->name('appearance');
    Route::get('orders', fn() => Inertia::render('settings/orders'))->name('orders');
    Route::get('favoris', fn() => Inertia::render('settings/favoris'))->name('favoris');
});


Route::prefix('category')->name('category.')->controller(CategoryController::class)->group(function () {
    Route::get('/{id}', 'category')->name('index');
});

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

Route::prefix('cart')->name('cart.')->controller(CartController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/add/{id}', 'addToCart')->name('add');
    Route::post('/remove/{id}', 'removeFromCart')->name('remove');
    Route::post('/clear', 'clearCart')->name('clear');
    Route::post('/increment', 'increment')->name('increment');
    Route::post('/decrement', 'decrement')->name('decrement');
});


