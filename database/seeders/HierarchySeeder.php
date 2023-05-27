<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HierarchySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hierarchies')->insert([
            ['name' => 'universitas mulawarman', 'parent_id' => 0], /* 1 */

            /** FAKULTAS */

            ['name' => 'ekonomi dan bisnis', 'parent_id' => 1],
            ['name' => 'ilmu sosial dan politik', 'parent_id' => 1],
            ['name' => 'pertanian', 'parent_id' => 1],
            ['name' => 'kehutanan', 'parent_id' => 1],
            ['name' => 'keguruan dan ilmu pendidikan', 'parent_id' => 1],
            ['name' => 'teknik', 'parent_id' => 1],
            ['name' => 'hukum', 'parent_id' => 1],
            ['name' => 'matematika dan ilmu pengetahuan alam', 'parent_id' => 1],
            ['name' => 'perikanan dan ilmu kelautan', 'parent_id' => 1],
            ['name' => 'kedokteran', 'parent_id' => 1],
            ['name' => 'kesehatan masyarakat', 'parent_id' => 1],
            ['name' => 'farmasi', 'parent_id' => 1],
            ['name' => 'ilmu budaya', 'parent_id' => 1],

            /** PRODI */
            // feb
            ['name' => 'manajemen', 'parent_id' => 2],
            ['name' => 'ekonomi pembangunan', 'parent_id' => 2],
            ['name' => 'akuntansi', 'parent_id' => 2],
            ['name' => 'ekonomi syariah', 'parent_id' => 2],

            // fisip
            ['name' => 'administrasi publik', 'parent_id' => 3],
            ['name' => 'ilmu pemerintahan', 'parent_id' => 3],
            ['name' => 'pembangunan sosial', 'parent_id' => 3],
            ['name' => 'psikologi', 'parent_id' => 3],
            ['name' => 'ilmu hubungan internasional', 'parent_id' => 3],
            ['name' => 'ilmu komunikasi', 'parent_id' => 3],
            ['name' => 'administrasi bisnis', 'parent_id' => 3],

            // pertanian
            ['name' => 'AGROEKOTEKNOLOGI', 'parent_id' => 4],
            ['name' => 'AGRIBISNIS', 'parent_id' => 4],
            ['name' => 'TEKNOLOGI HASIL PERTANIAN', 'parent_id' => 4],
            ['name' => 'PETERNAKAN', 'parent_id' => 4],

            // kehutanan
            ['name' => 'KEHUTANAN', 'parent_id' => 5],

            // fkip
            ['name' => 'PENDIDIKAN BIOLOGI', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN KIMIA', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN FISIKA', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN MATEMATIKA', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN EKONOMI', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN BAHASA DAN SASTRA  INDONESIA', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN BAHASA INGGRIS', 'parent_id' => 6],
            ['name' => 'BIMBINGAN DAN KONSELING', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN MASYARAKAT', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN JASMANI', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN GURU SEKOLAH DASAR', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN GURU PENDIDIKAN ANAK USIA DINI', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN GEOGRAFI', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN SEJARAH', 'parent_id' => 6],
            ['name' => 'PENDIDIKAN KOMPUTER', 'parent_id' => 6],

            // fpik
            ['name' => 'AKUAKULTUR', 'parent_id' => 7],
            ['name' => 'SOSIAL EKONOMI PERIKANAN', 'parent_id' => 7],
            ['name' => 'PENGELOLAAN SUMBERDAYA PERIKANAN', 'parent_id' => 7],
            ['name' => 'TEKNOLOGI HASIL PERIKANAN', 'parent_id' => 7],
            ['name' => 'ILMU KELAUTAN', 'parent_id' => 7],

            // hukum
            ['name' => 'HUKUM', 'parent_id' => 8],

            // fmipa
            ['name' => 'STATISTIKA', 'parent_id' => 9],
            ['name' => 'BIOLOGI', 'parent_id' => 9],
            ['name' => 'KIMIA', 'parent_id' => 9],
            ['name' => 'FISIKA', 'parent_id' => 9],
            ['name' => 'MATEMATIKA', 'parent_id' => 9],
            ['name' => 'GEOFISIKA', 'parent_id' => 9],

            // teknik
            ['name' => 'TEKNIK SIPIL', 'parent_id' => 10],
            ['name' => 'TEKNIK INDUSTRI', 'parent_id' => 10],
            ['name' => 'TEKNIK LINGKUNGAN', 'parent_id' => 10],
            ['name' => 'TEKNIK PERTAMBANGAN', 'parent_id' => 10],
            ['name' => 'TEKNIK KIMIA', 'parent_id' => 10],
            ['name' => 'ARSITEKTUR', 'parent_id' => 10],
            ['name' => 'TEKNIK GEOLOGI', 'parent_id' => 10],
            ['name' => 'TEKNIK ELEKTRO', 'parent_id' => 10],
            ['name' => 'TEKNIK MESIN', 'parent_id' => 10],
            ['name' => 'INFORMATIKA', 'parent_id' => 10],
            ['name' => 'SISTEM INFORMASI', 'parent_id' => 10],

            // kdeokteran
            ['name' => 'KEDOKTERAN', 'parent_id' => 11],
            ['name' => 'KEDOKTERAN GIGI', 'parent_id' => 11],

            // kesmas
            ['name' => 'KESEHATAN MASYARAKAT', 'parent_id' => 12],

            // farmasi
            ['name' => 'FARMASI', 'parent_id' => 13],
            ['name' => 'FARMASI KLINIS', 'parent_id' => 13],

            // ilmu budaya
            ['name' => 'SASTRA INDONESIA', 'parent_id' => 14],
            ['name' => 'SASTRA INGGRIS', 'parent_id' => 14],
            ['name' => 'ETNOMUSIKOLOGI', 'parent_id' => 14],
        ]);
    }
}
