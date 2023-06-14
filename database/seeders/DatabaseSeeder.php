<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\Admin::factory()->create();

        // $this->call([
        //     RoleSeeder::class,
        //     HierarchySeeder::class,
        // ]);

        // \App\Models\User::factory(1000)->create();

        // $paslons = [
        //     [
        //         'id' => 3,
        //         'total_voters' => 35,
        //     ],
        //     [
        //         'id' => 4,
        //         'total_voters' => 60,
        //     ],
        // ];

        // // Dummy data users votings
        // $users = \App\Models\User::all();

        // foreach ($paslons as $paslon) {
        //     for ($i = 1; $i <= $paslon['total_voters']; $i++) {

        //         $user = $users->get($i - 1);

        //         $startDateTime = Carbon::today()->setTime(8, 0, 0); // Tanggal saat ini, jam 8 pagi
        //         $endDateTime = Carbon::today()->setTime(17, 0, 0); // Tanggal saat ini, jam 5 sore
        //         $randomDateTime = Carbon::createFromTimestamp(rand($startDateTime->timestamp, $endDateTime->timestamp));

        //         \App\Models\Voting::create([
        //             'pemira_id' => 2,
        //             'user_id' => $user->nim,
        //             'paslon_id' => $paslon['id'],
        //             'created_at' => $randomDateTime,
        //             'updated_at' => $randomDateTime,
        //         ]);
        //     }
        // }
    }
}
