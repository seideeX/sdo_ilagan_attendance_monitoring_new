<?php

namespace Database\Factories;

use App\Models\Administrator\AttendanceAm;
use App\Models\Administrator\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Administrator\AttendanceAm>
 */
class AttendanceAmFactory extends Factory
{
    protected $model = AttendanceAm::class;

    public function definition(): array
    {
        $amIn  = $this->faker->dateTimeBetween('07:30:00', '08:15:00');
        $amOut = $this->faker->dateTimeBetween('11:50:00', '12:10:00');

        return [
            'attendance_id' => Attendance::factory(),

            // 70% chance to have a value, 30% missing
            'am_time_in' => $this->faker->boolean(70) ? $amIn->format('H:i:s') : null,
            'am_time_out' => $this->faker->boolean(80) ? $amOut->format('H:i:s') : null,
        ];
    }
}