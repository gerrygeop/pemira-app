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
            ->paginate(15)
            ->appends($request->all());

        return Inertia::render('Dapur/Users/Index', [
            'users' => $users,
            'faculties' => Faculty::whereNot('id', 1)->get(),
            'filters' => $request->all('search')
        ]);
    }
}
