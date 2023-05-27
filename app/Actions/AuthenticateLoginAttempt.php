<?php

namespace App\Actions;

use App\Enums\PemiraStatus;
use App\Models\Hierarchy;
use App\Models\Pemira;
use App\Models\User;
use App\Models\Voting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthenticateLoginAttempt
{
    public function __invoke(Request $request)
    {
        $user = $this->findUser($request);

        // if (is_null($user)) {
        //     $response = $this->loginSIA($request->nim, $request->password);

        //     if ($response->ok()) {
        //         $data = $this->getDetailUser(json_decode($response)->data->id);

        //         $this->isPemiraAvailable([1, $data->faculty_id, $data->departement_id]);

        //         $sanitizeEmail = Str::of($data->email)->trim()->lower();

        //         $this->validateStatusSIA($data->status);
        //         $this->validateEmail($request->email, $sanitizeEmail);
        //         $this->findOrSaveHierarchy($data);

        //         $arrData = [
        //             'name' => $data->name,
        //             'email' => $sanitizeEmail,
        //             'password' => Hash::make($request->password),
        //             'department_id' => $data->departement_id,
        //             'academic_year' => $data->academic_year,
        //         ];

        //         $user = User::find($data->nim);

        //         if (is_null($user)) {
        //             $arrData['nim'] = $data->nim;
        //             $user = User::create($arrData);
        //         } else {
        //             $user->update($arrData);
        //         }
        //     }
        // }

        if ($user && Hash::check($request->password, $user->password)) {

            $pemira_id = $this->isPemiraAvailable([1, $user->department->parent_id, $user->department_id], true);

            $this->hasVoted($pemira_id, $user->nim);

            // GENERATE OTP & SEND OTP
            // $user->generateTwoFactorCode();
            // $user->notify(new TwoFactorCode());
            return $user;
        }
    }

    public function hasVoted($pemira_id, $user_id)
    {
        $voter = Voting::whereIn('pemira_id', $pemira_id)
            ->where('user_id',  $user_id)
            ->get();

        if (!$voter->isEmpty()) {
            throw ValidationException::withMessages([
                'email' => 'Anda sudah memilih.',
            ]);
        }
    }

    public function findUser(Request $request)
    {
        $user = User::where('nim', '=', $request->nim)
            ->where('email', '=', $request->email)
            ->first();

        if ($user && !Hash::check($request->password, $user->password)) {
            return null;
        }

        return $user;
    }

    private function loginSIA($nim, $password)
    {
        $response = Http::acceptJson()
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('BEARER_TOKEN'),
                'apikey' => env('API_KEY'),
            ])
            ->post(env("URL_LOGIN"), [
                'username' => $nim,
                'password' => $password,
                'usertype' => 'MHS',
            ]);

        if ($response->failed()) {
            throw ValidationException::withMessages([
                'email' => 'Data tidak ditemukan. Pastikan data anda sesuai dengan yang terdaftar pada SIA.',
            ]);
        }

        return $response;
    }

    private function getDetailUser($nim)
    {
        $res = Http::acceptJson()
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('BEARER_TOKEN'),
                'apikey' => env('API_KEY'),
            ])
            ->get(env("URL_GET_USER") . $nim);

        $data = json_decode($res);

        if ($data->message != 'Success') {
            throw ValidationException::withMessages([
                'email' => 'Gagal login.',
            ]);
        }

        return $data->data;
    }

    public function validateEmail($requestEmail, $emailSIA)
    {
        if ($requestEmail != $emailSIA) {
            throw ValidationException::withMessages([
                'email' => 'Email salah. Masukan email yang sesuai dengan SIA.',
            ]);
        }
        if (User::where('email', $emailSIA)->count() > 0) {
            throw ValidationException::withMessages([
                'email' => 'Email sudah pernah digunakan.',
            ]);
        }
    }

    public function validateStatusSIA($status)
    {
        if ($status != env("STATUS_MHS")) {
            throw ValidationException::withMessages([
                'email' => 'Anda bukan mahasiswa aktif.',
            ]);
        }
    }

    public function validateFaculty($faculty)
    {
        if ($faculty != env("ID_FACULTY")) {
            throw ValidationException::withMessages([
                'email' => 'Anda bukan mahasiswa Fakultas.',
            ]);
        }
    }

    private function isPemiraAvailable($hierarchies, $return = false)
    {
        $pemiras = Pemira::whereIn('hierarchy_id', $hierarchies)
            ->where('activated_at', '<', now())
            ->orWhere('status', PemiraStatus::ACTIVE)
            ->get();

        $pemiras->map(fn ($pemira) => $pemira->validateActivation());
        $pemira = $pemiras->where('status', PemiraStatus::ACTIVE);

        if ($pemira->isEmpty()) {
            throw ValidationException::withMessages([
                'email' => 'Tidak tersedia Pemilihan Raya (PEMIRA) saat ini.',
            ]);
        }

        if ($return) {
            return $pemira->flatten()->pluck('id')->toArray();
        }
    }

    private function findOrSaveHierarchy($data)
    {
        $faculty = Hierarchy::find($data->faculty_id);
        if (is_null($faculty)) {
            Hierarchy::create([
                'id' => $data->faculty_id,
                'name' => $data->nameFaculty,
                'parent_id' => 1,
            ]);
        }

        $departement = Hierarchy::find($data->departement_id);
        if (is_null($departement)) {
            Hierarchy::create([
                'id' => $data->departement_id,
                'name' => $data->departement_name,
                'parent_id' => $data->faculty_id,
            ]);
        }
    }
}
