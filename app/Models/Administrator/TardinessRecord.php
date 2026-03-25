<?php

namespace App\Models\Administrator;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\HumanResource\TardyConvertion;

class TardinessRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'attendance_id',
        'date',
        'am_tardy',
        'pm_tardy',
        'undertime',
        'total_tardy',
        'converted_tardy'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }

    public function tardyConvertions()
    {
        return $this->belongsToMany(
            TardyConvertion::class,
            'converted_tardy_records',
            'tardiness_record_id',  
            'tardy_convertion_id' 
        )->withTimestamps();
    }
}
