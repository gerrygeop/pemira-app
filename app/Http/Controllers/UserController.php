<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:cooking');
    }

    public function index(Request $request): Response
    {
        $users = User::query()
            ->with('department')
            ->when(
                $request->search,
                fn ($query) => $query->where('name', 'LIKE', "%" . $request->search . "%")->orWhere('email', 'LIKE', '%' . $request->search . '%')
            )
            ->when(
                $request->faculty,
                fn ($query) => $query->whereHas('department', function ($query) use ($request) {
                    $query->where('faculty_id', $request->faculty);
                })
            )
            ->paginate(15);

        return Inertia::render('Dapur/Users/Index', [
            'users' => $users,
            'faculties' => Faculty::whereNot('id', 1)->get()
        ]);
    }
}
