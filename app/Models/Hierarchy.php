<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hierarchy extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function children(): HasMany
    {
        return $this->hasMany(Hierarchy::class, 'parent_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Hierarchy::class, 'parent_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'department_id');
    }

    public function pemira(): HasMany
    {
        return $this->hasMany(Pemira::class);
    }
}
