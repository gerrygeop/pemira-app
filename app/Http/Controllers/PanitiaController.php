<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PanitiaController extends Controller
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:' . Admin::class,
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => ['exists:roles,id'],
        ]);

        $panitia = DB::transaction(function () use ($validated) {
            $validated['password'] = Hash::make($validated['password']);

            $panitia = Admin::create([
                'name' => $validated['name'],
                'username' => $validated['username'],
                'password' => $validated['password'],
            ]);

            $panitia->assignRole($validated['role']);

            return $panitia;
        });

        return to_route('d.panitia.index')->with('status', $panitia->name . ' berhasil dibuat');
    }

    public function edit(Admin $panitia): Response
    {
        return Inertia::render('Dapur/Panitia/Edit', [
            'panitia' => $panitia,
            'roles' => Role::all()
        ]);
    }

    /**
     * Update the panitia profile information.
     */
    public function updateInformation(Request $request, Admin $panitia)
    {
        $validated = $request->validate([
            'name' => ['string', 'max:255'],
            'username' => ['string', 'max:255', Rule::unique(Admin::class)->ignore($panitia->id)],
            'role' => ['exists:roles,id'],
        ]);

        DB::transaction(function () use ($validated, $panitia) {
            $panitia->update([
                'name' => $validated['name'],
                'username' => $validated['username'],
            ]);

            $panitia->syncRole($validated['role']);
        });

        return back();
    }

    /**
     * Update the panitia password.
     */
    public function updatePassword(Request $request, Admin $panitia)
    {
        $validated = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        if (Hash::check($validated['current_password'], $panitia->password)) {
            $panitia->update([
                'password' => Hash::make($validated['password']),
            ]);

            return back()->with('status', ['saved' => 'Password ' . $panitia->name . ' berhasil diperbarui.']);
        } else {
            return back()->with('status', ['error' => 'Password salah']);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, Admin $panitia)
    {
        $validated = $request->validate([
            'password' => ['required'],
        ]);

        $deletedPanitia = $panitia->name;

        if (Hash::check($validated['password'], $panitia->password)) {
            $panitia->delete();

            return to_route('d.panitia.index')->with('status', $deletedPanitia . ' berhasil dihapus');
        } else {
            return back()->with('status', ['deletion_error' => 'Password ' . $panitia->name . ' salah']);
        }
    }
}
