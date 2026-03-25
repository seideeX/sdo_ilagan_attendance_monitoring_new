<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentHeadRequest;
use App\Models\Administrator\Employee;
use App\Models\DepartmentHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class DepartmentHeadController extends Controller
{
    public function index()
    {
        $query = DepartmentHead::query()
            ->join('employees', 'department_heads.employee_id', '=', 'employees.id')
            ->select('department_heads.id', 'department_heads.department', 'department_heads.employee_id', 'department_heads.status')
            ->when(request('department'), function ($q, $department) {
                $q->where('department_heads.department', $department);
            })
            ->when(request('status'), function ($q, $status) {
                $q->where('department_heads.status', $status);
            })
            ->when(request('search'), function ($q, $search) {
                $q->where(function ($query) use ($search) {
                    $query->where('employees.first_name', 'like', "%{$search}%")
                        ->orWhere('employees.middle_name', 'like', "%{$search}%")
                        ->orWhere('employees.last_name', 'like', "%{$search}%");
                });
            });


        $dept_heads = $query
            ->with('head:id,first_name,middle_name,last_name,position,department,work_type')
            ->orderBy('employees.last_name')
            ->get();

        $employees = Employee::select('id', 'first_name', 'middle_name', 'last_name',  'work_type', 'position')->get();

        return Inertia::render('Admin/DepartmentHead/DepartmentHead', [
            'dept_heads' => $dept_heads,
            'employees' => $employees,
            'queryParams' => request()->query(),
        ]);
    }

    public function store(StoreDepartmentHeadRequest $request)
    {
        try {

            DB::beginTransaction();

            $data = $request->validated();

            $exists = DepartmentHead::where('department', $data['department'])
                ->where('status', 'active')
                ->exists();

            if ($exists && $data['status'] === 'active') {
                throw new \Exception('This department already has an active head.');
            }

            DepartmentHead::create($data);

            DB::commit();

            return redirect()
                ->route('departmenthead')
                ->with('success', 'Department head created successfully.');
        } catch (Throwable $e) {

            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', $e->getMessage());
        }
    }

    public function toggleStatus(Request $request, DepartmentHead $departmentHead)
    {
        $request->validate([
            'status' => ['required', 'in:active,inactive'],
        ]);

        try {
            DB::beginTransaction();

            $newStatus = $request->status;

            if ($newStatus === 'active') {
                $exists = DepartmentHead::where('department', $departmentHead->department)
                    ->where('status', 'active')
                    ->where('id', '!=', $departmentHead->id)
                    ->exists();

                if ($exists) {
                    return response()->json([
                        'message' => 'This department already has an active head.',
                    ], 422);
                }
            }

            $departmentHead->update([
                'status' => $newStatus,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $departmentHead->status,
            ]);
        } catch (Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update status.',
            ], 500);
        }
    }
    public function destroy(Request $request, $id)
    {
        try {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            $deptHead = DepartmentHead::findOrFail($id);
            $deptHead->delete();

            return back()->with('success', 'Department head deleted successfully.');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to delete department head.');
        }
    }
}
