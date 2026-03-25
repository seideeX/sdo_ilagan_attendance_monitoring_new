<?php

namespace App\Services;

class HourNormalization
{
    /**
     * Convert a decimal tardy (H.MM) into total minutes.
     */
    public static function toMinutes(float $decimal): int
    {
        $hours   = floor($decimal);
        $minutes = round(($decimal - $hours) * 100);

        return ($hours * 60) + $minutes;
    }

    /**
     * Convert total minutes back into H.MM format
     * with ".6 = 1" rule (e.g., 61 mins = 1.01).
     */
    public static function toDecimal(int $totalMinutes): float
    {
        $hours   = intdiv($totalMinutes, 60);
        $minutes = $totalMinutes % 60;

        return floatval($hours . '.' . str_pad($minutes, 2, '0', STR_PAD_LEFT));
    }

    /**
     * Add multiple tardy decimals correctly using the rule.
     */
    public static function sum(array $decimals): float
    {
        $totalMinutes = 0;
        foreach ($decimals as $decimal) {
            $totalMinutes += self::toMinutes($decimal);
        }
        return self::toDecimal($totalMinutes);
    }
}
