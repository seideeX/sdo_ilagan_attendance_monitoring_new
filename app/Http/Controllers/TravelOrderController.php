<?php

namespace App\Http\Controllers;

use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Administrator\Employee;
class TravelOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
    public function index()
    {
        $employee = Employee::first(); // same as LocatorSlip

        $travel_orders = TravelOrder::with('employee')
            ->latest()
            ->get();

        return Inertia::render('Employee/TravelOrder/TravelOrderPage', [
            'travel_orders' => $travel_orders,
            'employee' => $employee,
            'success_message' => session('success_message'),
            'error_message' => session('error_message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'purpose_of_travel' => 'required|string|max:255',
            'host_of_activity' => 'nullable|string|max:255',
            'inclusive_dates' => 'required|date',
            'destination' => 'required|string|max:255',
            'fund_source' => 'nullable|string|max:255',
        ]);

        $employee = Employee::first(); // same logic

        if (!$employee) {
            return redirect()
                ->route('travelorder')
                ->with('error_message', 'No employee found in the system.');
        }

        TravelOrder::create([
            'employee_id' => $employee->id,
            ...$validated
        ]);

        return redirect()
            ->route('travelorder')
            ->with('success_message', 'Travel Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TravelOrder $travelOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TravelOrder $travelOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TravelOrder $travelOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TravelOrder $travelOrder)
    {
        //
    }
}
