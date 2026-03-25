<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Administrator\Attendance;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
public function index()
{
    $attendances = Attendance::with(['employee', 'am', 'pm'])
        ->orderBy('date', 'desc')
        ->whereDate('date', Carbon::today())
        ->get();

    return Inertia::render('Attendance/Attendance', [
        'attendances' => $attendances,
    ]);
}
}