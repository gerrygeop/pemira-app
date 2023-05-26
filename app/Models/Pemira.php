<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pemira extends Model
{
    use HasFactory;

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

    public function hierarchy(): BelongsTo
    {
        return $this->belongsTo(Hierarchy::class);
    }

    public function validateActivation()
    {
        if ($this->less_than_now($this->activated_at) && $this->status !== 'pending') {
            $this->update_status('active');
        }
        if ($this->less_than_now($this->finished_at)) {
            $this->update_status('inactive');
        }
    }

    public function toggleStatus()
    {
        if ($this->less_than_now($this->finished_at)) {
            return $this->update_status('finished');
        } else if ($this->status === 'inactive' && !$this->less_than_now($this->activated_at)) {
            return $this->update_status('active');
        } else if ($this->status === 'active' && !$this->less_than_now($this->activated_at)) {
            return $this->update_status('inactive');
        } else if ($this->status !== 'pending' && $this->less_than_now($this->activated_at)) {
            return $this->update_status('pending');
        } else if ($this->status === 'pending') {
            return $this->update_status('active');
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
}
