<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->jsonb('profile')->nullable();
            $table->timestamps();
        });

        Schema::create('paslon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemira_id')->constrained('pemira')->cascadeOnDelete();
            $table->foreignId('candidate_id')->nullable()->constrained('candidates')->cascadeOnDelete();
            $table->foreignId('partner_id')->nullable()->constrained('candidates');
            $table->integer('no_urut');
            $table->jsonb('items')->nullable();
            $table->string('photo_path', 2048)->nullable();
            $table->integer('total_suara')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paslon');
        Schema::dropIfExists('candidates');
    }
};
