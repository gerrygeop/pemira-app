<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaslonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'no_urut' => ['required', 'numeric'],
            'items.visi' => ['required', 'string'],
            'items.misi' => ['required', 'string'],

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
        ];
    }
}
