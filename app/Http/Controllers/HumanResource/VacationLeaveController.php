<?php

namespace App\Http\Controllers\HumanResource;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HumanResource\VacationLeave;
use App\Models\HumanResource\Period;

class VacationLeaveController extends Controller
{
    public function update(Request $request)
    {
        // Validate incoming data
        $data = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'period_id'   => 'required|exists:periods,id',
            'used_wpay'   => 'nullable|numeric',
            'used_wopay'  => 'nullable|numeric',
            'remarks'     => 'nullable|string',
            'particulars' => 'nullable|string',
        ]);

        // Update or create the vacation leave row
        $leave = VacationLeave::updateOrCreate(
            [
                'employee_id' => $data['employee_id'],
                'period_id'   => $data['period_id'],
            ],
            [
                'used_wpay'  => $data['used_wpay'] ?? 0,
                'used_wopay' => $data['used_wopay'] ?? 0,
                'remarks'    => $data['remarks'] ?? null,
            ]
        );

        // Update the particulars in the period table if provided
        if (!empty($data['particulars'])) {
            $period = Period::find($data['period_id']);
            if ($period) {
                $period->update([
                    'employee_id' => $data['employee_id'],
                    'particulars' => $data['particulars']
                ]);
            }
        }

        return redirect()->back()->with('success', 'Vacation leave updated successfully.');
    }
}
