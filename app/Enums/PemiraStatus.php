<?php

namespace App\Enums;

enum PemiraStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case PENDING = 'pending';
    case FINISHED = 'finished';

    public function isActive(): bool
    {
        return $this === self::ACTIVE;
    }
    public function isNotActive(): bool
    {
        return $this === self::INACTIVE;
    }
    public function isPending(): bool
    {
        return $this === self::PENDING;
    }
    public function isFinished(): bool
    {
        return $this === self::FINISHED;
    }
}
