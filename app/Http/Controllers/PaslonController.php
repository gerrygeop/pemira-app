<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaslonRequest;
use App\Models\Candidate;
use App\Models\Paslon;
use App\Models\Pemira;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PaslonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
     * Display the specified resource.
     */
    public function show(Paslon $paslon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paslon $paslon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paslon $paslon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paslon $paslon)
    {
        //
    }
}
