<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Faculty extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'faculties';

    public function faculty(): HasMany
    {
        return $this->hasMany(Department::class);
    }
}
