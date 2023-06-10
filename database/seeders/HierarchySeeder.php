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
        /** FAKULTAS */
        DB::table('faculties')->insert([
            ['name' => 'ekonomi dan bisnis'],
            ['name' => 'ilmu sosial dan ilmu politik'],
            ['name' => 'pertanian'],
            ['name' => 'kehutanan'],
            ['name' => 'keguruan dan ilmu pendidikan'],
            ['name' => 'teknik'],
            ['name' => 'hukum'],
            ['name' => 'matematika dan ilmu pengetahuan alam'],
            ['name' => 'perikanan dan ilmu kelautan'],
            ['name' => 'kedokteran'],
            ['name' => 'kesehatan masyarakat'],
            ['name' => 'farmasi'],
            ['name' => 'ilmu budaya'],
        ]);

        /** PRODI */
        // DB::table('departments')->insert([
        //     // feb
        //     ['name' => 'manajemen', 'faculty_id' => 2],
        //     ['name' => 'ekonomi pembangunan', 'faculty_id' => 2],
        //     ['name' => 'akuntansi', 'faculty_id' => 2],
        //     ['name' => 'ekonomi syariah', 'faculty_id' => 2],

        //     // fisip
        //     ['name' => 'administrasi publik', 'faculty_id' => 3],
        //     ['name' => 'ilmu pemerintahan', 'faculty_id' => 3],
        //     ['name' => 'pembangunan sosial', 'faculty_id' => 3],
        //     ['name' => 'psikologi', 'faculty_id' => 3],
        //     ['name' => 'ilmu hubungan internasional', 'faculty_id' => 3],
        //     ['name' => 'ilmu komunikasi', 'faculty_id' => 3],
        //     ['name' => 'administrasi bisnis', 'faculty_id' => 3],

        //     // pertanian
        //     ['name' => 'AGROEKOTEKNOLOGI', 'faculty_id' => 4],
        //     ['name' => 'AGRIBISNIS', 'faculty_id' => 4],
        //     ['name' => 'TEKNOLOGI HASIL PERTANIAN', 'faculty_id' => 4],
        //     ['name' => 'PETERNAKAN', 'faculty_id' => 4],

        //     // kehutanan
        //     ['name' => 'KEHUTANAN', 'faculty_id' => 5],

        //     // fkip
        //     ['name' => 'PENDIDIKAN BIOLOGI', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN KIMIA', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN FISIKA', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN MATEMATIKA', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN EKONOMI', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN BAHASA DAN SASTRA  INDONESIA', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN BAHASA INGGRIS', 'faculty_id' => 6],
        //     ['name' => 'BIMBINGAN DAN KONSELING', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN MASYARAKAT', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN JASMANI', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN GURU SEKOLAH DASAR', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN GURU PENDIDIKAN ANAK USIA DINI', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN GEOGRAFI', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN SEJARAH', 'faculty_id' => 6],
        //     ['name' => 'PENDIDIKAN KOMPUTER', 'faculty_id' => 6],

        //     // fpik
        //     ['name' => 'AKUAKULTUR', 'faculty_id' => 7],
        //     ['name' => 'SOSIAL EKONOMI PERIKANAN', 'faculty_id' => 7],
        //     ['name' => 'PENGELOLAAN SUMBERDAYA PERIKANAN', 'faculty_id' => 7],
        //     ['name' => 'TEKNOLOGI HASIL PERIKANAN', 'faculty_id' => 7],
        //     ['name' => 'ILMU KELAUTAN', 'faculty_id' => 7],

        //     // hukum
        //     ['name' => 'HUKUM', 'faculty_id' => 8],

        //     // fmipa
        //     ['name' => 'STATISTIKA', 'faculty_id' => 9],
        //     ['name' => 'BIOLOGI', 'faculty_id' => 9],
        //     ['name' => 'KIMIA', 'faculty_id' => 9],
        //     ['name' => 'FISIKA', 'faculty_id' => 9],
        //     ['name' => 'MATEMATIKA', 'faculty_id' => 9],
        //     ['name' => 'GEOFISIKA', 'faculty_id' => 9],

        //     // teknik
        //     ['name' => 'TEKNIK SIPIL', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK INDUSTRI', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK LINGKUNGAN', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK PERTAMBANGAN', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK KIMIA', 'faculty_id' => 10],
        //     ['name' => 'ARSITEKTUR', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK GEOLOGI', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK ELEKTRO', 'faculty_id' => 10],
        //     ['name' => 'TEKNIK MESIN', 'faculty_id' => 10],
        //     ['name' => 'INFORMATIKA', 'faculty_id' => 10],
        //     ['name' => 'SISTEM INFORMASI', 'faculty_id' => 10],

        //     // kdeokteran
        //     ['name' => 'KEDOKTERAN', 'faculty_id' => 11],
        //     ['name' => 'KEDOKTERAN GIGI', 'faculty_id' => 11],

        //     // kesmas
        //     ['name' => 'KESEHATAN MASYARAKAT', 'faculty_id' => 12],

        //     // farmasi
        //     ['name' => 'FARMASI', 'faculty_id' => 13],
        //     ['name' => 'FARMASI KLINIS', 'faculty_id' => 13],

        //     // ilmu budaya
        //     ['name' => 'SASTRA INDONESIA', 'faculty_id' => 14],
        //     ['name' => 'SASTRA INGGRIS', 'faculty_id' => 14],
        //     ['name' => 'ETNOMUSIKOLOGI', 'faculty_id' => 14],
        // ]);
    }
}
