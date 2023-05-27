<?php

use App\Enums\PemiraStatus;
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
        Schema::create('pemira', function (Blueprint $table) {
            $table->id();
            $table->foreignId('creator_id');
            $table->string('nama_pemira');
            $table->string('status')->default(PemiraStatus::INACTIVE->value);
            $table->text('keterangan')->nullable();
            $table->dateTime('activated_at');
            $table->dateTime('finished_at');
            $table->timestamps();
        });

        Schema::create('admin_pemira', function (Blueprint $table) {
            $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');
            $table->foreignId('pemira_id')->constrained('pemira')->onDelete('cascade');
            $table->primary(['admin_id', 'pemira_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_pemira');
        Schema::dropIfExists('pemira');
    }
};
