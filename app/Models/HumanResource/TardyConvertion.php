<?php

namespace App\Models\HumanResource;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Administrator\Employee;
use App\Models\Administrator\TardinessRecord;

class TardyConvertion extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'employee_id',
        'batch_id',
        'total_tardy',
        'total_hours',
        'total_minutes',
        'total_equivalent',
    ];

    public function tardinessRecords()
    {
        return $this->belongsToMany(TardinessRecord::class, 'converted_tardy_records')
                    ->withTimestamps();
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function batch()
    {
        return $this->belongsTo(TardyBatch::class, 'batch_id');
    }
}
