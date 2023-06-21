<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserOneTimePassword;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Monolog\Handler\IFTTTHandler;

class OneTimePasswordController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/OneTimePassword');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required']
        ]);

        $user = request()->user();

        if (is_null($user->token) || is_null($user->token_expires_at)) {
            throw ValidationException::withMessages([
                'token' => 'Kode OTP telah kedaluwarsa. Silahkan klik kirim ulang kode.',
            ]);
        }
        if ($user->token_expires_at->lt(now())) {
            throw ValidationException::withMessages([
                'token' => 'Kode OTP telah kedaluwarsa. Silahkan klik kirim ulang kode.',
            ]);
        } else if ($request->token !== $user->token) {
            throw ValidationException::withMessages([
                'token' => 'Kode OTP yang anda masukan tidak sesuai.',
            ]);
        } else {
            $user->resetToken();
            return redirect()->intended(RouteServiceProvider::HOME);
        }
    }

    public function resend(): RedirectResponse
    {
        $user = request()->user();
        $throttleKey = Str::transliterate(Str::lower($user->email) . '|' . request()->ip());

        if (!RateLimiter::tooManyAttempts($throttleKey, 1)) {
            $user->generateToken();

            UserOneTimePassword::dispatch($user);

            RateLimiter::hit($throttleKey);

            return redirect()->back()->with('status', 'resend');
        } else {
            event(new Lockout(request()));

            $seconds = RateLimiter::availableIn($throttleKey);

            return redirect()->back()->with('status', ['limiter' => 'Terlalu banyak mengirim ulang kode. Silakan coba lagi dalam ' . $seconds . ' detik.']);
        }
    }
}
