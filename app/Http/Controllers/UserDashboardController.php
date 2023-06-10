<?php

namespace App\Http\Controllers;

use App\Enums\PemiraStatus;
use App\Http\Requests\VotingRequest;
use App\Models\Paslon;
use App\Models\Pemira;
use App\Models\Voting;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    public function dashboard(): Response
    {
        $pemira = Pemira::with('paslon')
            ->whereIn('level', [1])
            ->where('status', PemiraStatus::ACTIVE)
            ->orderBy('level')
            ->get();

        return Inertia::render('Dashboard', [
            'collections' => $pemira
        ]);
    }

    public function vote(VotingRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            foreach ($validated['pemira'] as $pemiraId => $paslonId) {
                Voting::create([
                    'pemira_id' => $pemiraId,
                    'user_id' => Auth::guard('web')->id(),
                    'paslon_id' => $paslonId,
                ]);

                $paslon = Paslon::findOrFail($paslonId);
                $paslon->total_suara += 1;
                $paslon->save();
            }
        });

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('status', "success");
    }
}
