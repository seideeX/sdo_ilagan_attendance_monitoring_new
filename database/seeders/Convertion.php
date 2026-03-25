<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\HumanResource\ConvertionMinutes;
use App\Models\HumanResource\ConvertionHours;
use Illuminate\Database\Seeder;

class Convertion extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($m = 1; $m <= 60; $m++) {
            ConvertionMinutes::create([
                "minutes" => $m,
                "equivalent_days" => round($m * 0.002083, 3),
            ]);
        }

        for($h = 1; $h <= 16; $h++) {
            ConvertionHours::create([
                "hours" => $h,
                "equivalent_days" => round($h * 0.125, 3),
            ]);
        }
    }
        //
}
