<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Voting extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'nim');
    }

    public function paslon(): BelongsTo
    {
        return $this->belongsTo(Paslon::class);
    }

    public function pemira(): BelongsTo
    {
        return $this->belongsTo(Pemira::class);
    }
}
