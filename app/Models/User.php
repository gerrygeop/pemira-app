<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    protected $primaryKey = 'nim';
    protected $incrementing  = false;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'token_expires_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Hierarchy::class, 'department_id');
    }

    public function generateToken()
    {
        $this->timestamps = false;
        $this->token = rand(100000, 999999);
        $this->token_expires_at = now()->addMinutes(2);
        $this->save();
    }

    public function resetToken()
    {
        $this->timestamps = false;
        $this->token = null;
        $this->token_expires_at = null;
        $this->save();
    }
}
