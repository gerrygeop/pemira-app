<?php

namespace App\Http\Controllers;

use App\Http\Resources\DapurResource;
use App\Models\Pemira;
use App\Models\Role;
use App\Models\Voting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PemiraController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:read_pemira')->only('show', 'index');
        $this->middleware('can:create_pemira')->only('store');
        $this->middleware('can:update_pemira')->only('update', 'switchable');
        $this->middleware('can:delete_pemira')->only('destroy');
    }

    public function index(): Response
    {
        $admin = Auth::guard('admin')->id();
        $pemira = Pemira::where('creator_id', $admin)->orWhereRelation('admins', 'admin_id', $admin)->get();

        return Inertia::render('Dapur/Pemira/Index', [
            'pemiraList' => $pemira,
        ]);
    }

    public function show(Pemira $pemira): Response
    {
        $pemira->validateActivation();
        return Inertia::render('Dapur/Pemira/Show', [
            'pemira' => $pemira->load('paslon', 'admins'),
            'roles' => Role::all()
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

            $pemira = Pemira::create($validated);
            return $pemira;
        });

        return to_route('d.pemira.show', $pemira)->with('status', ['message' => $pemira->nama_pemira . ' berhasil dibuat']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pemira $pemira)
    {
        $validated = $request->validate([
            'nama_pemira' => ['required', 'string', 'max:200'],
            'keterangan' => ['nullable', 'string'],
            'activated_at' => ['required', 'date'],
            'finished_at' => ['required', 'date'],
        ]);

        $updatedPemira = DB::transaction(function () use ($validated, $pemira) {
            $pemira->update($validated);
            return $pemira;
        });

        return to_route('d.pemira.show', $pemira)->with('status', ['message' => $updatedPemira->nama_pemira . ' berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemira $pemira)
    {
        $pemira_name = $pemira->nama_pemira;
        $pemira->delete();
        return to_route('d.pemira.index')->with('status', ['message' => $pemira_name . ' dihapus']);
    }

    public function switchable(Pemira $pemira)
    {
        $pemira->toggleStatus();
        return back()->with('status', ['message' => 'Pemira ' . str()->title($pemira->status->value)]);
    }

    public function suaraMasuk(Pemira $pemira): Response
    {
        return Inertia::render('Dapur/Pemira/SuaraMasuk', [
            'pemira' => DapurResource::make($pemira->load('paslon')),
        ]);
    }

    public function rekapitulasi(Pemira $pemira): Response
    {
        $votings = Voting::select(['paslon_id', 'created_at'])->where('pemira_id', $pemira->id)->get();
        $groupByHours = $votings->sortBy('created_at')->groupBy(function ($voting) {
            return $voting->created_at->format('Y-m-d H');
        });

        foreach ($pemira->paslon as $paslon) {
            $pair = is_null($paslon->partner) ? $paslon->candidate->name : $paslon->candidate->name . ' & ' . $paslon->partner->name;

            $totalVoted = 0;
            $i = 1;
            foreach ($groupByHours as $hour => $collect) {
                $hour = Str::of($hour)->ltrim('0');
                $totalVoted += $collect->where('paslon_id', $paslon->id)->count();

                $vote[$i][$pair] = $totalVoted;
                $times[$i] = strval($hour);

                $i++;
            }
        }

        $donut = $pemira->getTotalSuara();
        $bar = $pemira->countVotings();

        return Inertia::render('Dapur/Pemira/Rekapitulasi', [
            'pemira' => $pemira,
            'votes' => collect($vote),
            'times' => collect($times),
            'donutChartData' => collect($donut)->toArray(),
            'barChartData' => collect($bar)->toArray()
        ]);
    }
}
