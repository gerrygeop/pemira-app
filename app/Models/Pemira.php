<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pemira extends Model
{
    use HasFactory;

    protected $PEMIRA_ACTIVE = 'active';
    protected $PEMIRA_INACTIVE = 'inactive';
    protected $PEMIRA_PENDING = 'pending';
    protected $PEMIRA_FINISHED = 'finished';

    protected $guarded = ['id'];
    protected $table = 'pemira';

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
        if ($this->less_than_now($this->activated_at) && $this->status !== $this->PEMIRA_PENDING) {
            $this->update_status($this->PEMIRA_ACTIVE);
        }
        if ($this->less_than_now($this->finished_at)) {
            $this->update_status($this->PEMIRA_INACTIVE);
        }
    }

    public function toggleStatus()
    {
        if ($this->less_than_now($this->finished_at)) {
            return $this->update_status($this->PEMIRA_FINISHED);
        } else if ($this->status === $this->PEMIRA_INACTIVE && !$this->less_than_now($this->activated_at)) {
            return $this->update_status($this->PEMIRA_ACTIVE);
        } else if ($this->status === $this->PEMIRA_ACTIVE && !$this->less_than_now($this->activated_at)) {
            return $this->update_status($this->PEMIRA_INACTIVE);
        } else if ($this->status !== $this->PEMIRA_PENDING && $this->less_than_now($this->activated_at)) {
            return $this->update_status($this->PEMIRA_PENDING);
        } else if ($this->status === $this->PEMIRA_PENDING) {
            return $this->update_status($this->PEMIRA_ACTIVE);
        }
    }

    private function less_than_now($at)
    {
        $datetime = Carbon::parse($at);
        if ($datetime->lt(now())) return true;
    }

    private function update_status($status)
    {
        $this->status = $status;
        $this->save();
    }

    public function statusTitle()
    {
        if ($this->status !== $this->PEMIRA_ACTIVE) {
            return 'aktifkan';
        }
        if ($this->status !== $this->PEMIRA_INACTIVE) {
            return 'tutup';
        }
        if ($this->status !== $this->PEMIRA_PENDING) {
            return 'tunda';
        }
        return 'selesai';
    }
}
