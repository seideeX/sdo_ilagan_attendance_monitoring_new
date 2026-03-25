<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Administrator\Employee;
use App\Models\HumanResource\VacationLeave;
use App\Models\HumanResource\SickLeave;
use App\Models\HumanResource\Period;

class LeaveCardSeeder extends Seeder
{
    public function run(): void
    {
        $employees = Employee::where('id', '!=', 1)->get();

        foreach ($employees as $employee) {
            $vacationBalance = 0;
            $sickBalance = 0;

            // Create periods for each employee individually
            for ($month = 1; $month <= 12; $month++) {
                $date = date('Y-m-01', strtotime("2025-$month-01"));

                $period = Period::firstOrCreate([
                    'employee_id' => $employee->id,
                    'period' => $date,
                ]);

                $earned = 1.25;

                VacationLeave::factory()->create([
                    'employee_id' => $employee->id,
                    'period_id' => $period->id,
                    'earned' => $earned,
                    'balance' => $vacationBalance,
                ]);

                SickLeave::factory()->create([
                    'employee_id' => $employee->id,
                    'period_id' => $period->id,
                    'earned' => $earned,
                    'balance' => $sickBalance,
                ]);
            }
        }
    }
}
