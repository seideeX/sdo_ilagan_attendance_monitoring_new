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
        Schema::create('sick_leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->foreignId('period_id')->constrained('periods')->onDelete('cascade');
            $table->decimal('earned', 5, 3)->nullable()->default(0.00);
            $table->decimal('used_wpay', 5, 3)->nullable()->default(0.00);
            $table->decimal('balance', 5, 3)->nullable()->default(0.00);
            $table->decimal('used_wopay', 5, 3)->nullable()->default(0.00);
            $table->string('remarks', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sick_leaves');
    }
};
