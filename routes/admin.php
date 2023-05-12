<?php

use App\Http\Controllers\Dapur\Auth\AdminPasswordController;
use App\Http\Controllers\Dapur\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Dapur\Auth\RegisteredAdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('dp')->name('dp.')->group(function () {

    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AdminAuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {
        Route::get('register', [RegisteredAdminController::class, 'create'])
            ->name('register');

        Route::post('register', [RegisteredAdminController::class, 'store'])->name('register.store');

        Route::put('password', [AdminPasswordController::class, 'update'])->name('password.update');

        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])
            ->name('logout');
    });
});
