<?php

use App\Http\Controllers\Dapur\Auth\AdminPasswordController;
use App\Http\Controllers\Dapur\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Dapur\Auth\RegisteredAdminController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('d')->name('d.')->group(function () {

    Route::middleware('guest:admin')->group(function () {
        Route::get('/', function () {
            return to_route('d.login');
        });

        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AdminAuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {

        Route::get('/d/dashboard', function () {
            return Inertia::render('Dapur/Dashboard');
        })->name('d.dashboard');

        Route::get('register', [RegisteredAdminController::class, 'create'])
            ->name('register');

        Route::post('register', [RegisteredAdminController::class, 'store'])->name('register.store');

        Route::put('password', [AdminPasswordController::class, 'update'])->name('password.update');

        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        Route::resource('roles', RoleController::class);
    });
});
