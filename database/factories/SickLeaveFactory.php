<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\HumanResource\SickLeave;

class SickLeaveFactory extends Factory
{
    protected $model = SickLeave::class;

    public function definition(): array
    {
        return [
            'earned' => 1.25,
            'used_wpay' => 0.00,
            'balance' => 0.00,
            'used_wopay' => 0.00,
            'remarks' => null,
        ];
    }
}
