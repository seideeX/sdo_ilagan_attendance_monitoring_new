<?php

namespace App\Http\Controllers\HumanResource;

use App\Http\Controllers\Controller;
use App\Models\Administrator\Employee;
use App\Services\LeaveCardServices;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeeLeaveCardController extends Controller
{
    public function index()
    {
        // Just fetch all employees, no filtering in backend
        $employees = Employee::orderBy('last_name')->get();

        foreach ($employees as $employee) {
            LeaveCardServices::recalculateBalances($employee->id);
        }

        return Inertia::render('HR/EmployeeLeaveCard/EmployeeLeaveCard', [
            'employees' => $employees,
        ]);
    }


    public function show($id)
    {

        LeaveCardServices::recalculateBalances($id);

        $employee = Employee::with([
            'vacationLeaves.period',
            'sickLeaves.period',
        ])->findOrFail($id);

        return Inertia::render('HR/EmployeeLeaveCard/ViewEmployeeLeaveCard', [
            'employee' => $employee,
        ]);
    }


    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        // Validate the editable fields
        $validated = $request->validate([
            'civil_status' => 'nullable|string',
            'gsis_policy_no' => 'nullable|string',
            'entrance_to_duty' => 'nullable|date',
            'tin_no' => 'nullable|string',
            'employment_status' => 'nullable|string',
            'unit' => 'nullable|string',
            'national_reference_card_no' => 'nullable|string',
        ]);

        $employee->update($validated);
    }
}
