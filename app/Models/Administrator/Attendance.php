<?php

namespace App\Models\Administrator;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Database\Factories\AttendanceFactory;

class Attendance extends Model
{
    /** @use HasFactory<\Database\Factories\AttendanceFactory> */
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'date',
    ];

    public function am()
    {
        return $this->hasOne(AttendanceAm::class);
    }

    public function pm()
    {
        return $this->hasOne(AttendancePm::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function tardinessRecord()
    {
        return $this->hasOne(TardinessRecord::class);
    }

    protected static function newFactory()
    {
        return AttendanceFactory::new();
    }

}