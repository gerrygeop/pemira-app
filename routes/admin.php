<?php

use App\Http\Controllers\Dapur\Auth\AdminPasswordController;
use App\Http\Controllers\Dapur\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Dapur\Auth\RegisteredAdminController;
use App\Http\Controllers\PemiraController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('d')->name('d.')->group(function () {

    // Admin before login
    Route::middleware('guest:admin')->group(function () {
        Route::get('/', function () {
            return to_route('d.login');
        });

        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('login', [AdminAuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    // Admin after login
    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('Dapur/Dashboard');
        })->name('dashboard');

        // Pemira
        Route::resource('pemira', PemiraController::class);
        Route::patch('pemira/switchable/{pemira}', [PemiraController::class, 'switchable'])->name('pemira.switchable');

        // Roles & Permissions
        Route::resource('roles', RoleController::class)->except(['show', 'create', 'edit']);

        // User update|profile|password|logout
        Route::get('register', [RegisteredAdminController::class, 'create'])->name('register');
        Route::post('register', [RegisteredAdminController::class, 'store'])->name('register.store');
        Route::put('password', [AdminPasswordController::class, 'update'])->name('password.update');
        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});
