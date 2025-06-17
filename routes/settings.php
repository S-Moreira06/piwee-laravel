<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix('settings')->group(function () {
    // Redirection de base
    Route::redirect('/', 'settings/profile', 301);

    // Gestion du profil
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Gestion du mot de passe
    Route::prefix('password')->group(function () {
        Route::get('/', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('/', [PasswordController::class, 'update'])->name('password.update');
    });

    // Pages statiques
    Route::get('appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Route::get('orders', function () {
    //     return Inertia::render('settings/orders');
    // })->name('orders');

    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show');


    // Route::get('favoris', function () {
    //     return Inertia::render('settings/favoris');
    // })->name('favoris');

    // Routes pour les favoris
    Route::prefix('favorites')->group(function () {
        Route::get('/', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/', [FavoriteController::class, 'store'])->name('favorites.store');
        Route::delete('/{item}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');
        Route::get('/check/{item}', [FavoriteController::class, 'check'])->name('favorites.check');
    });
});
