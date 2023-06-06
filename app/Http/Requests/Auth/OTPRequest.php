<?php

namespace App\Http\Requests\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class OTPRequest extends FormRequest
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
            'token' => 'required',
        ];
    }

    public function validateOTP()
    {
        $user = Auth::guard('web')->user();

        if ($user->token_expires_at->lt(now())) {
            $user->resetToken();

            Auth::guard('web')->logout();
            $this->session()->invalidate();
            $this->session()->regenerateToken();

            return redirect('/')->with('status', 'expired');
        }

        if ($this->token !== $user->token) {
            throw ValidationException::withMessages([
                'token' => 'Kode OTP yang anda masukan salah.',
            ]);
        }

        return true;
    }
}
