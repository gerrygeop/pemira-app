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
        if ($this->activated_at_less_than_now() && $this->status !== $this->PEMIRA_PENDING) {
            $this->activate();
        }
        if ($this->finished_at_less_than_now()) {
            $this->inactivate();
        }
    }

    public function toggleStatus()
    {
        if ($this->status === $this->PEMIRA_INACTIVE && !$this->activated_at_less_than_now()) {
            return $this->activate();
        }
        if ($this->status === $this->PEMIRA_ACTIVE && !$this->activated_at_less_than_now()) {
            return $this->inactivate();
        }
        if ($this->status === $this->PEMIRA_PENDING) {
            return $this->activate();
        }
        if ($this->status !== $this->PEMIRA_PENDING && $this->activated_at_less_than_now()) {
            return $this->pending();
        }
    }

    public function activated_at_less_than_now()
    {
        $datetime = Carbon::parse($this->activated_at);
        if ($datetime->lt(now())) return true;
    }

    public function finished_at_less_than_now()
    {
        $datetime = Carbon::parse($this->finished_at);
        if ($datetime->lt(now())) return true;
    }

    private function activate()
    {
        $this->status = $this->PEMIRA_ACTIVE;
        $this->save();
    }

    private function inactivate()
    {
        $this->status = $this->PEMIRA_INACTIVE;
        $this->save();
    }

    private function pending()
    {
        $this->status = $this->PEMIRA_PENDING;
        $this->save();
    }

    public function buttonTitle()
    {
        if ($this->status === $this->PEMIRA_INACTIVE || $this->status === $this->PEMIRA_PENDING) {
            return 'publish';
        }
        if ($this->status === $this->PEMIRA_ACTIVE && !$this->activated_at_less_than_now()) {
            return 'tutup';
        }
        if ($this->status === $this->PEMIRA_ACTIVE && $this->activated_at_less_than_now()) {
            return 'tunda';
        }
    }
}
