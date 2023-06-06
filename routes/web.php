<?php

use App\Http\Controllers\UserDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified.otp'])->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'dashboard'])
        ->name('dashboard');

    Route::post('/vote', [UserDashboardController::class, 'vote'])
        ->name('vote');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
