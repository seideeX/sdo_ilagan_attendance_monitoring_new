<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\HumanResource\VacationLeave;

class VacationLeaveFactory extends Factory
{
    protected $model = VacationLeave::class;

    public function definition(): array
    {
        // This won't return all 12 months at once. 
        // We'll handle multiple months in a seeder.
        return [
            'earned' => 1.25,
            'used_wpay' => 0.00,
            'balance' => 0.00,
            'used_wopay' => 0.00,
            'remarks' => null,
        ];
    }
}
