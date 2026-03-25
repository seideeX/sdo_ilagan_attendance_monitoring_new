<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Administrator\Employee;
use App\Models\Administrator\Attendance;
use App\Models\Administrator\AttendanceAm;
use App\Models\Administrator\AttendancePm;
use Carbon\Carbon;

class MonthlySeeder extends Seeder
{
    public function run(): void
    {
        $years = [2025];
        $employees = Employee::where('id', '!=', 1)->get();

        foreach ($years as $year) {
            foreach ($employees as $employee) {
                for ($month = 1; $month <= 12; $month++) {
                    $start = Carbon::createFromDate($year, $month, 1);
                    $end = $start->copy()->endOfMonth();

                    for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
                        if ($date->isWeekend()) continue;

                        // Add low probability to skip attendance (e.g., 5%)
                        if (rand(1, 100) <= 5) {
                            continue;
                        }

                        $attendance = Attendance::create([
                            'employee_id' => $employee->id,
                            'date' => $date->toDateString(),
                        ]);

                        AttendanceAm::factory()->create([
                            'attendance_id' => $attendance->id,
                        ]);

                        AttendancePm::factory()->create([
                            'attendance_id' => $attendance->id,
                        ]);
                    }
                }
            }
        }
    }
}
