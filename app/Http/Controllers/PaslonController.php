<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaslonRequest;
use App\Models\Candidate;
use App\Models\Paslon;
use App\Models\Pemira;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PaslonController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:read_paslon')->only('show');
        $this->middleware('can:create_paslon')->only('create', 'store');
        $this->middleware('can:update_paslon')->only('edit', 'update');
        $this->middleware('can:delete_paslon')->only('destroy');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Pemira $pemira): Response
    {
        return Inertia::render('Dapur/Paslon/FormPaslon', [
            'pemira' => $pemira->id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaslonRequest $request, $pemira)
    {
        $validated = $request->validated();
        $validated['pemira_id'] = $pemira;

        DB::transaction(function () use ($validated) {
            $new = [];
            foreach (['candidate', 'partner'] as $value) {
                $candidate = Candidate::create([
                    'name' => $validated[$value]['name'],
                    'profile' => json_encode($validated[$value]['profile']),
                ]);
                $new[$value] = $candidate->id;
            }

            Paslon::create([
                'pemira_id' => $validated['pemira_id'],
                'candidate_id' => $new['candidate'],
                'partner_id' => $new['partner'],
                'no_urut' => $validated['no_urut'],
                'items' => json_encode($validated['items']),
            ]);
        });

        return to_route('d.pemira.show', $pemira)->with('status', 'New Paslon');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paslon $paslon)
    {
        return Inertia::render('Dapur/Paslon/FormPaslon', [
            'paslon' => $paslon,
            'can' => [
                'update_paslon' => Auth::guard('admin')->user()->can('update_paslon'),
                'delete_paslon' => Auth::guard('admin')->user()->can('delete_paslon'),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaslonRequest $request, Paslon $paslon)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $paslon) {
            Candidate::where('id', $paslon->candidate_id)->update([
                'name' => $validated['candidate']['name'],
                'profile' => json_encode($validated['candidate']['profile']),
            ]);
            Candidate::where('id', $paslon->partner_id)->update([
                'name' => $validated['partner']['name'],
                'profile' => json_encode($validated['partner']['profile']),
            ]);

            $paslon->update([
                'no_urut' => $validated['no_urut'],
                'items' => json_encode($validated['items']),
            ]);
        });

        return to_route('d.pemira.show', $paslon->pemira_id)->with('status', 'Update Paslon');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paslon $paslon)
    {
        //
    }
}
