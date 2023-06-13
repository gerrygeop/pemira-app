<?php

namespace App\Http\Controllers;

use App\Http\Resources\DapurResource;
use App\Models\Pemira;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VotingController extends Controller
{
    public function index(): Response
    {
        $admin = Auth::guard('admin')->id();
        $pemira = Pemira::where('status', 'active')->where('creator_id', $admin)->orWhereRelation('admins', 'admin_id', $admin)->get();

        return Inertia::render('Dapur/Voting/Index', [
            'pemira' => DapurResource::collection($pemira),
        ]);
    }
}
