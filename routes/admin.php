<?php

use App\Http\Controllers\Dapur\Auth\AdminPasswordController;
use App\Http\Controllers\Dapur\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\PanitiaController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\PemiraController;
use App\Http\Controllers\ProfileController;
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

        // Paslon & Panitia
        Route::prefix('pemira')->name('pemira.')->group(function () {
            // Paslon
            Route::get('paslon/create/{pemira}', [PaslonController::class, 'create'])->name('paslon.create');
            Route::post('paslon/{pemira}', [PaslonController::class, 'store'])->name('paslon.store');
            Route::resource('paslon', PaslonController::class)->only('edit', 'update', 'destroy');

            // Panitia
            Route::get('{pemira}/panitia/{panitia}/edit', [PanitiaController::class, 'edit'])->name('panitia.edit');
            Route::post('{pemira}/panitia', [PanitiaController::class, 'store'])->name('panitia.store');
            Route::patch('/panitia/{panitia}', [PanitiaController::class, 'updateInformation'])->name('panitia.update-information');
            Route::patch('/panitia/{panitia}/password', [PanitiaController::class, 'updatePassword'])->name('panitia.update-password');
            Route::delete('{pemira}/panitia/{panitia}', [PanitiaController::class, 'destroy'])->name('panitia.destroy');
        });


        // Roles & Permissions
        Route::resource('roles', RoleController::class)->except(['show', 'create', 'edit']);

        // Profile auth admin/panitia
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Admin update password || logout
        Route::put('password', [AdminPasswordController::class, 'update'])->name('password.update');
        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});
