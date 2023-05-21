<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:cooking');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dapur/Panitia/Index', [
            'panitiaList' => Admin::whereNotIn('id', [Auth::guard('admin')->id()])->with('roles')->get(),
            'roles' => Role::all()
        ]);
    }
}
