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
        Schema::create('converted_tardy_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tardy_convertion_id')->constrained('tardy_convertions')->onDelete('cascade');
            $table->foreignId('tardiness_record_id')->constrained('tardiness_records')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('converted_tardy_records');
    }
};
