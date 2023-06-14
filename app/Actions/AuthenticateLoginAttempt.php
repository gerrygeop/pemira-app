<?php

namespace App\Actions;

use App\Enums\PemiraStatus;
use App\Models\Department;
use App\Models\Faculty;
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

        if (is_null($user)) {
            $response = $this->loginSIA($request);

            if ($response->ok()) {
                $data = $this->getDetailUser(json_decode($response)->data->id);

                $this->isPemiraAvailable([1, $data->faculty_id, $data->departement_id]);

                $sanitizeEmail = Str::of($data->email)->trim()->lower();

                $this->validateStatusSIA($data->status);
                $this->validateEmail($request->email, $sanitizeEmail);
                $this->findOrSaveHierarchy($data);

                $userData = [
                    'name' => $data->name,
                    'email' => $sanitizeEmail,
                    'password' => Hash::make($request->password),
                    'department_id' => $data->departement_id,
                    'academic_year' => $data->academic_year,
                ];

                $user = User::find($data->nim);

                if (is_null($user)) {
                    $this->validateUniqueEmail($sanitizeEmail);

                    $userData['nim'] = $data->nim;
                    $user = User::create($userData);
                } else {
                    $user->update($userData);
                }
            }
        }

        if ($user && Hash::check($request->password, $user->password)) {

            $pemira_id = $this->isPemiraAvailable([1, $user->department->faculty_id, $user->department_id], true);

            $this->hasVoted($pemira_id, $user->nim);

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

    private function loginSIA($request)
    {
        $response = Http::acceptJson()
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('BEARER_TOKEN'),
                'apikey' => env('API_KEY'),
            ])
            ->post('https://osm.unmul.ac.id/login', [
                'username' => $request->nim,
                'password' => $request->password,
                'usertype' => 'MHS',
            ]);

        if ($response->ok()) {
            return $response;
        } else if ($response->failed()) {
            throw ValidationException::withMessages([
                'email' => 'Username dan password tidak sesuai.',
            ]);
        } else {
            throw ValidationException::withMessages([
                'email' => 'Username dan password tidak sesuai.',
            ]);
        }
    }

    private function getDetailUser($nim)
    {
        $res = Http::acceptJson()
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('BEARER_TOKEN'),
                'apikey' => env('API_KEY'),
            ])
            ->get('https://osm.unmul.ac.id/sia/mahasiswa/' . $nim);

        $data = json_decode($res);

        if ($data->message != 'Success') {
            throw ValidationException::withMessages([
                'email' => 'Gagal mendapatkan data user.',
            ]);
        }

        return $data->data;
    }

    public function  validateEmail($requestEmail, $emailSIA)
    {
        if ($requestEmail != $emailSIA) {
            throw ValidationException::withMessages([
                'email' => 'Email salah. Masukan email yang sesuai dengan SIA anda.',
            ]);
        }
    }

    public function validateUniqueEmail($emailSIA)
    {
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
                'email' => 'Anda tidak terdaftar didalam SIA.',
            ]);
        }
    }

    private function isPemiraAvailable($level, $return = false)
    {
        $pemiras = Pemira::whereIn('level', $level)
            ->where('activated_at', '<', now())
            ->where('finished_at', '>', now())
            ->get();

        $pemiras->map(fn ($pemira) => $pemira->validateActivation());
        $pemira = $pemiras->where('status', PemiraStatus::ACTIVE);

        if ($pemira->isEmpty()) {
            throw ValidationException::withMessages([
                'email' => 'Tidak ada Pemilihan Raya (PEMIRA) saat ini.',
            ]);
        }

        if ($return) {
            return $pemira->flatten()->pluck('id')->toArray();
        }
    }

    private function findOrSaveHierarchy($data)
    {
        $this->createOrUpdateFaculty($data);
        $this->createOrUpdateDepartment($data);
    }

    private function createOrUpdateFaculty($data)
    {
        $faculty = Faculty::find($data->faculty_id);
        if (is_null($faculty)) {
            Faculty::create([
                'id' => $data->faculty_id,
                'name' => $data->faculty_name,
            ]);
        } else if (str()->lower($data->faculty_name) !== str()->lower($faculty->name)) {
            $faculty->update([
                'name' => $data->faculty_name,
            ]);
        }
    }
    private function createOrUpdateDepartment($data)
    {
        $department = Department::find($data->departement_id);
        if (is_null($department)) {
            Department::create([
                'id' => $data->departement_id,
                'name' => $data->departement_name,
                'faculty_id' => $data->faculty_id,
            ]);
        }
    }
}
