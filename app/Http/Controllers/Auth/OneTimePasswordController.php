<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserOneTimePassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\OTPRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;


class OneTimePasswordController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Auth/OneTimePassword');
    }

    public function store(OTPRequest $request): RedirectResponse
    {
        if ($request->validateOTP()) {
            Auth::guard('web')->user()->resetToken();
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function resend(): RedirectResponse
    {
        $user = Auth::guard('web')->user();

        $user->generateToken();

        UserOneTimePassword::dispatch($user);

        return redirect()->back()->with('status', 'resend');
    }
}
