<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserOneTimePassword;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;


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

        $user = Auth::guard('web')->user();

        if ($user->token_expires_at->lt(now())) {
            $user->resetToken();

            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/')->with('status', 'expired');
        }

        if ($request->token !== $user->token) {
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
        $user = Auth::guard('web')->user();

        $user->generateToken();

        UserOneTimePassword::dispatch($user);

        return redirect()->back()->with('status', 'resend');
    }
}
