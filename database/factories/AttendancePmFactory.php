<?php

namespace Database\Factories;

use App\Models\Administrator\AttendancePm;
use App\Models\Administrator\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Administrator\AttendancePm>
 */
class AttendancePmFactory extends Factory
{
    protected $model = AttendancePm::class;

    public function definition(): array
    {
        $pmIn = $this->faker->dateTimeBetween('12:00 PM', '1:00 PM');
        $pmOut = $this->faker->dateTimeBetween('5:00 PM', '5:30 PM');


        return [
            'attendance_id' => Attendance::factory(),
            'pm_time_in' => $pmIn ? $pmIn->format('H:i:s') : null,
            'pm_time_out' => $pmOut ? $pmOut->format('H:i:s') : null,
        ];
    }
}