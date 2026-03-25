<?php

namespace App\Http\Controllers\HumanResource;


use App\Http\Controllers\Controller;
use App\Models\HumanResource\TardyBatch;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class ConvertedTardyRecordsController extends Controller
{
    public function index()
    {
        // Get batches with summary info
        $batches = TardyBatch::withCount('tardyConvertions')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($batch) {
                $start = Carbon::parse($batch->start_month);
                $end   = Carbon::parse($batch->end_month);

                return [
                    'id'          => $batch->id,
                    'batch_code'  => $batch->batch_code,
                    'month_range' => $start->format('F Y') === $end->format('F Y')
                        ? $start->format('F Y')
                        : $start->format('F') . ' - ' . $end->format('F Y'),
                    'count'       => $batch->tardy_convertions_count,
                ];
            });

        return Inertia::render('HR/TardyArchive/TardyArchive', [
            'batches' => $batches,
        ]);
    }

    public function show(TardyBatch $batch)
    {
        $records = $batch->tardyConvertions()
            ->with('employee', 'tardinessRecords')
            ->get();

        $start = Carbon::parse($batch->start_month);
        $end   = Carbon::parse($batch->end_month);

        return Inertia::render('HR/TardyArchive/TardyRecordBatch', [
            'batch'   => [
                'id'          => $batch->id,
                'batch_code'  => $batch->batch_code,
                'month_range' => $start->format('F Y') === $end->format('F Y')
                    ? $start->format('F Y')
                    : $start->format('F') . ' - ' . $end->format('F Y'),
            ],
            'records' => $records,
        ]);
    }
}
