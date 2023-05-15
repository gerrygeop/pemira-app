<?php

namespace App\Http\Controllers;

use App\Models\Pemira;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PemiraController extends Controller
{
    public function index(): Response
    {
        // return dd(Auth::guard('admin')->user()->pemira);
        return Inertia::render('Dapur/Pemira/Index', [
            'pemiraList' => Pemira::all(),
        ]);
    }

    public function show(Pemira $pemira)
    {
        return Inertia::render('Dapur/Pemira/Show', [
            'pemira' => $pemira,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pemira' => ['required', 'string', 'max:200'],
            'keterangan' => ['nullable', 'string'],
            'activated_at' => ['required', 'date'],
            'finished_at' => ['required', 'date'],
        ]);

        $pemira = DB::transaction(function () use ($validated) {
            $validated['creator_id'] = Auth::guard('admin')->id();
            $validated['slug'] = Str::slug($validated['nama_pemira']);

            $pemira = Pemira::create($validated);
            return $pemira;
        });

        return to_route('d.pemira.index')->with('status', $pemira->nama_pemira . ' berhasil dibuat');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pemira $pemira)
    {
        return dd($request->all());
        $validated = $request->validate([
            'nama_pemira' => ['required', 'string', 'max:200'],
            'keterangan' => ['required', 'string'],
            'activated_at' => ['required', 'date'],
            'finished_at' => ['required', 'date'],
        ]);

        DB::transaction(function () use ($validated, $pemira) {
            $validated['slug'] = Str::slug($validated['nama_pemira']);
            $pemira->update($validated);
        });

        return to_route('d.pemira.index')->with('status', $pemira->nama_pemira . ' berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemira $pemira)
    {
        $pemiraName = $pemira->nama_pemira;
        $pemira->delete();
        return back()->with('status', $pemiraName . ' berhasil dihapus');
    }
}
