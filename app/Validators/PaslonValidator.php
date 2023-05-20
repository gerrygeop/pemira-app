<?php

namespace App\Validators;

use App\Models\Paslon;
use Illuminate\Validation\Rule;

class PaslonValidator
{
    public function validate(Paslon $office, array $attributes): array
    {
        return validator(
            $attributes,
            [
                'no_urut' => ['required', 'numeric'],
                'items.visi' => ['required', 'string'],
                'items.misi' => ['required', 'string'],
                'photo_path' => ['nullable', 'file', 'max:5000', 'mimes:jpg,jpeg,png'],

                'candidate.name' => ['required', 'string', 'max:200'],
                'candidate.profile.angkatan' => ['required', 'numeric'],
                'candidate.profile.fakultas' => ['required', 'string', 'max:255'],
                'candidate.profile.organisasi' => ['nullable', 'string'],
                'candidate.profile.pendidikan' => ['nullable', 'string'],
                'candidate.profile.prestasi' => ['nullable', 'string'],

                'partner.name' => ['required', 'string', 'max:200'],
                'partner.profile.angkatan' => ['required', 'numeric'],
                'partner.profile.fakultas' => ['required', 'string', 'max:255'],
                'partner.profile.organisasi' => ['nullable', 'string'],
                'partner.profile.pendidikan' => ['nullable', 'string'],
                'partner.profile.prestasi' => ['nullable', 'string'],
            ]
        )->validate();
    }
}
