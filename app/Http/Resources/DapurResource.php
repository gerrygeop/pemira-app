<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class DapurResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'votes' => $this->countVotes(),
            $this->merge(Arr::except(parent::toArray($request), [
                'paslon',
                'created_at',
                'updated_at',
            ]))
        ];
    }
}
