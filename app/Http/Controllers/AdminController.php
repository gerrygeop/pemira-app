<?php

namespace App\Http\Controllers;

use App\Models\Admin;

class AdminController extends Controller
{
    public function index()
    {
        return to_route('/');
    }
}
