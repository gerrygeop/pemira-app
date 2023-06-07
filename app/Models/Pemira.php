<?php

namespace App\Models;

use App\Enums\PemiraStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pemira extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'pemira';

    protected $casts = [
        'status' => PemiraStatus::class,
    ];

    public function votings(): HasMany
    {
        return $this->hasMany(Voting::class);
    }

    public function admins(): BelongsToMany
    {
        return $this->belongsToMany(Admin::class);
    }

    public function paslon(): HasMany
    {
        return $this->hasMany(Paslon::class);
    }

    public function validateActivation()
    {
        if ($this->less_than_now($this->activated_at) && !$this->status->isPending()) {
            $this->update_status(PemiraStatus::ACTIVE);
        }
        if ($this->less_than_now($this->finished_at)) {
            $this->update_status(PemiraStatus::FINISHED);
        }
    }

    public function toggleStatus()
    {
        if ($this->less_than_now($this->finished_at)) {
            return $this->update_status(PemiraStatus::FINISHED);
        } else if ($this->status->isNotActive() && !$this->less_than_now($this->activated_at)) {
            return $this->update_status(PemiraStatus::ACTIVE);
        } else if ($this->status->isActive() && !$this->less_than_now($this->activated_at)) {
            return $this->update_status(PemiraStatus::INACTIVE);
        } else if (!$this->status->isPending() && $this->less_than_now($this->activated_at)) {
            return $this->update_status(PemiraStatus::PENDING);
        } else if ($this->status->isPending()) {
            return $this->update_status(PemiraStatus::ACTIVE);
        }
    }

    private function less_than_now($at)
    {
        $datetime = Carbon::parse($at);
        if ($datetime->lt(now())) return true;
    }

    private function update_status($status)
    {
        $this->status = $status->value;
        $this->save();
    }
}
