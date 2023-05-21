<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
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
        return Inertia::render('Dapur/Roles/Index', [
            'roles' => Role::with('permissions')->orderBy('name', 'desc')->get(),
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'permissions' => ['exists:permissions,id']
        ]);

        $role = DB::transaction(function () use ($validated) {
            $role = Role::create(['name' => $validated['name']]);
            $role->allowTo($validated['permissions']);
            return $role;
        });

        return to_route('d.roles.index')->with('status', $role->name . ' berhasil dibuat');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'permissions' => ['exists:permissions,id']
        ]);

        DB::transaction(function () use ($validated, $role) {
            $role->update(['name' => $validated['name']]);
            $role->allowTo($validated['permissions']);
        });

        return to_route('d.roles.index')->with('status', $role->name . ' berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $roleName = $role->name;
        $role->delete();
        return back()->with('status', $roleName . ' berhasil dihapus');
    }
}
