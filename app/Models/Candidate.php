<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Candidate extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function paslon(): HasOne
    {
        return $this->hasOne(Paslon::class);
    }
}
