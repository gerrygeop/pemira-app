<?php

namespace App\Http\Controllers;

use App\Models\Pemira;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DapurDashboardController extends Controller
{
    public function dashboard(): Response
    {
        $admin = Auth::guard('admin')->id();
        $pemira = Pemira::where('creator_id', $admin)->orWhereRelation('admins', 'admin_id', $admin)->withCount(['paslon', 'admins'])->get();

        $stats = collect([
            'users' => User::count(),
        ]);

        return Inertia::render('Dapur/Dashboard', [
            'pemira' => $pemira,
            'stats' => $stats
        ]);
    }
}
