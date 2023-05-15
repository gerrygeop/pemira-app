<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemira extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'pemira';

    public function admins()
    {
        return $this->belongsToMany(Admin::class);
    }
}
