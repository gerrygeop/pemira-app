<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Paslon extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'paslon';
    protected $with = ['candidate', 'partner'];

    public function pemira(): BelongsTo
    {
        return $this->belongsTo(Pemira::class);
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class);
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'partner_id');
    }
}
