<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Pemira;
use App\Models\Role;
use Illuminate\Http\Request;
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
        $this->middleware('can:create_admin')->only('store');
        $this->middleware('can:update_admin')->only('edit', 'updateInformation', 'updatePassword');
        $this->middleware('can:update_admin')->only('destroy');
    }

    public function store(Request $request, Pemira $pemira)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:' . Admin::class,
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => ['exists:roles,id'],
        ]);
        $validated['pemira_id'] = $pemira->id;

        $panitia = DB::transaction(function () use ($validated) {
            $validated['password'] = Hash::make($validated['password']);

            $panitia = Admin::create([
                'name' => $validated['name'],
                'username' => $validated['username'],
                'password' => $validated['password'],
            ]);

            $panitia->assignRole($validated['role']);
            $panitia->assignPemira($validated['pemira_id']);

            return $panitia;
        });

        return back()->with('status', ['message' => $panitia->name . ' berhasil dibuat']);
    }

    public function edit(Pemira $pemira, Admin $panitia): Response
    {
        return Inertia::render('Dapur/Panitia/Edit', [
            'panitia' => $panitia,
            'pemira' => $pemira->id,
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
    public function destroy(Request $request, Pemira $pemira, Admin $panitia)
    {
        $validated = $request->validate([
            'password' => ['required'],
        ]);

        $deletedPanitia = $panitia->name;

        if (Hash::check($validated['password'], $panitia->password)) {
            $panitia->delete();

            return to_route('d.pemira.show', $pemira)->with('status', ['message' => 'Panitia ' . $deletedPanitia . ' berhasil dihapus']);
        } else {
            return back()->with('status', ['deletion_error' => 'Password ' . $panitia->name . ' salah']);
        }
    }
}
