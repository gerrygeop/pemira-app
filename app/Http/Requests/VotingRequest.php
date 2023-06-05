<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VotingRequest extends FormRequest
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
            'pemira' => 'required',
            'pemira.*' => ['exists:paslon,id'],
        ];
    }

    public function messages()
    {
        return [
            'pemira.required' => 'Paslon harus dipilih.',
            'pemira.array' => 'Field pemira harus berupa array.',
            'pemira.*.exists' => 'Nilai vote tidak valid.',
        ];
    }
}
