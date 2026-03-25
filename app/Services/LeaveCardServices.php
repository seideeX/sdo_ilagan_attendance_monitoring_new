<?php
namespace App\Services;

use App\Models\HumanResource\VacationLeave;
use App\Models\HumanResource\SickLeave;

class LeaveCardServices
{
    public static function recalculateBalances($employeeId)
    {
    $vlBalance = 0;
    $vacationLeaves = VacationLeave::where('employee_id', $employeeId)
        ->orderBy('period_id')
        ->get();

    foreach ($vacationLeaves as $vl) {
        $vlBalance += $vl->earned ?? 0; // accumulate only earned
        $vlBalance -= ($vl->used_wpay ?? 0) + ($vl->used_wopay ?? 0);

        $vl->update([
            'balance' => $vlBalance
        ]);
    }

        // --- Sick Leave ---
        $slBalance = 0;
        $sickLeaves = SickLeave::where('employee_id', $employeeId)
            ->orderBy('period_id')
            ->get();

        foreach ($sickLeaves as $sl) {
            $slBalance += $sl->earned ?? 0;
            $slBalance -= ($sl->used_wpay ?? 0) + ($sl->used_wopay ?? 0);

            SickLeave::updateOrCreate(
                ['id' => $sl->id],
                [
                    'employee_id' => $sl->employee_id,
                    'period_id'   => $sl->period_id,
                    'earned'      => $sl->earned,
                    'used_wpay'   => $sl->used_wpay,
                    'used_wopay'  => $sl->used_wopay,
                    'remarks'     => $sl->remarks,
                    'balance'     => $slBalance,
                ]
            );
        }
    }
}
