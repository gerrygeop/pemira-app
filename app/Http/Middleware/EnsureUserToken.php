<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::guard('web')->user();

        if (Auth::guard('web')->check() && $user->token) {
            if ($user->token_expires_at->lt(now())) {
                $user->resetToken();

                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect('/')->with('status', 'expired');
            }

            if (!$request->is('otp*')) {
                return redirect()->route('otp.index');
            }
        }

        return $next($request);
    }
}
