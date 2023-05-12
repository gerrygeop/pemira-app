<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['name' => 'superadmin'],
            ['name' => 'kppr'],
            ['name' => 'panwas']
        ]);

        DB::table('permissions')->insert([
            ['name' => 'all_access'],

            ['name' => 'create_pemira'],
            ['name' => 'read_pemira'],
            ['name' => 'update_pemira'],
            ['name' => 'delete_pemira'],

            ['name' => 'create_paslon'],
            ['name' => 'read_paslon'],
            ['name' => 'update_paslon'],
            ['name' => 'delete_paslon'],

            ['name' => 'create_voting'],
            ['name' => 'read_voting'],
            ['name' => 'update_voting'],
            ['name' => 'delete_voting'],
        ]);

        DB::table('permission_role')->insert([
            [
                'permission_id' => 1,
                'role_id' => 1,
            ],
        ]);

        DB::table('admin_role')->insert([
            [
                'admin_id' => 1,
                'role_id' => 1,
            ],
        ]);
    }
}
