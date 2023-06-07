<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaslonRequest;
use App\Models\Candidate;
use App\Models\Faculty;
use App\Models\Paslon;
use App\Models\Pemira;
use App\Validators\PaslonValidator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PaslonController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:read_paslon')->only('edit');
        $this->middleware('can:create_paslon')->only('create', 'store');
        $this->middleware('can:update_paslon')->only('update');
        $this->middleware('can:delete_paslon')->only('destroy');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Pemira $pemira): Response
    {
        return Inertia::render('Dapur/Paslon/FormPaslon', [
            'pemira' => $pemira->id,
            'faculties' => Faculty::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaslonRequest $request, $pemira)
    {
        $validated = $request->validated();
        $validated['pemira_id'] = $pemira;

        $paslon = DB::transaction(function () use ($validated) {
            $new = [];
            foreach (['candidate', 'partner'] as $value) {
                $candidate = Candidate::create([
                    'name' => $validated[$value]['name'],
                    'profile' => json_encode($validated[$value]['profile']),
                ]);
                $new[$value] = $candidate->id;
            }

            if (request()->hasFile('photo_path')) {
                $url = $validated['photo_path']->hashName();
                $validated['photo_path'] = $url;
                request()->file('photo_path')->storeAs('foto-paslon/', $url);
            }

            $paslon = Paslon::create([
                'pemira_id' => $validated['pemira_id'],
                'candidate_id' => $new['candidate'],
                'partner_id' => $new['partner'],
                'no_urut' => $validated['no_urut'],
                'items' => json_encode($validated['items']),
                'photo_path' => $validated['photo_path'],
            ]);

            return $paslon;
        });

        return to_route('d.pemira.show', $pemira)
            ->with('status', [
                'message' => 'Paslon No ' . $paslon->no_urut . ' berhasil dibuat'
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paslon $paslon)
    {
        return Inertia::render('Dapur/Paslon/FormPaslon', [
            'paslon' => $paslon,
            'faculties' => Faculty::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Paslon $paslon)
    {
        $extractData = request()->only('data');
        $extractData = $extractData['data'];
        $validated = (new PaslonValidator())->validate($paslon, $extractData);

        DB::transaction(function () use ($validated, $paslon) {
            Candidate::where('id', $paslon->candidate_id)->update([
                'name' => $validated['candidate']['name'],
                'profile' => json_encode($validated['candidate']['profile']),
            ]);
            Candidate::where('id', $paslon->partner_id)->update([
                'name' => $validated['partner']['name'],
                'profile' => json_encode($validated['partner']['profile']),
            ]);

            if (request()->hasFile('data.photo_path')) {
                if (Storage::disk('public')->exists('foto-paslon/' . $paslon->photo_path)) {
                    Storage::disk('public')->delete('foto-paslon/' . $paslon->photo_path);
                }

                $url = $validated['photo_path']->hashName();
                $validated['photo_path'] = $url;
                request()->file('data.photo_path')->storeAs('foto-paslon/', $url);

                $paslon->update([
                    'no_urut' => $validated['no_urut'],
                    'items' => json_encode($validated['items']),
                    'photo_path' => $validated['photo_path'],
                ]);
            } else {
                $paslon->update([
                    'no_urut' => $validated['no_urut'],
                    'items' => json_encode($validated['items']),
                ]);
            }
        });

        return to_route('d.pemira.show', $paslon->pemira_id)
            ->with('status', [
                'message' => 'Paslon No ' . $paslon->no_urut . ' berhasil diperbarui'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paslon $paslon)
    {
        if (Storage::disk('public')->exists('foto-paslon/' . $paslon->photo_path)) {
            Storage::disk('public')->delete('foto-paslon/' . $paslon->photo_path);
        }

        $temp = $paslon;
        $paslon->delete();

        return to_route('d.pemira.show', $temp->pemira_id)
            ->with('status', [
                'message' => 'Paslon No ' . $temp->no_urut . ' berhasil dihapus'
            ]);
    }
}
