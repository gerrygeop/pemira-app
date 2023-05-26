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
        Schema::create('hierarchies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('parent_id')->default(0);
            $table->timestamps();
        });

        Schema::table('pemira', function (Blueprint $table) {
            $table->foreignId('hierarchy_id')->after('creator_id')->nullable()->constrained('hierarchies')->nullOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('department_id')->after('password')->nullable()->constrained('hierarchies')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hierarchies');
        Schema::table('pemira', function (Blueprint $table) {
            $table->dropColumn('hierarchy_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('hierarchy_id');
        });
    }
};
