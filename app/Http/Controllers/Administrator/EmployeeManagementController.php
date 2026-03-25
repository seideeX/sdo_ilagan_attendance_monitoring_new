<?php

namespace App\Http\Controllers\Administrator;


use App\Http\Controllers\Controller;
use App\Models\Administrator\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeManagementController extends Controller
{
    /**
     * Display a listing of employees and registered biometrics.
     */
    public function index()
    {
        $employees = Employee::all();

        $employeesWithFingers = Employee::withCount('biometric')->get()
            ->transform(function ($emp) {
                $emp->available_fingers = 3 - $emp->biometric_count;
                return $emp;
            });

        // Registered and unregistered
        $registeredEmployees = $employeesWithFingers->filter(fn($e) => $e->biometric_count > 0)->values();
        $unregisteredEmployees = $employeesWithFingers->filter(fn($e) => $e->biometric_count === 0)->values();

        return Inertia::render('Admin/EmployeeManagement/EmployeeManagement', [
            'allEmployees' => $employees,
            'employeesList' => $employeesWithFingers,
            'registeredList' => $registeredEmployees,
            'unregisteredList' => $unregisteredEmployees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'work_type' => 'required|string|max:255',
        ]);

        Employee::create($validated);

        return redirect()->back()->with('success', 'Employee added successfully 🎉');
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'work_type' => 'required|string|max:255',
            'active_status' => 'required|boolean',
        ]);

        $employee->update($validated);

        return redirect()->back()->with('success', 'Employee updated successfully 🎉');
    }
}
