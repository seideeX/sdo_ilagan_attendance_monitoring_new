<?php

namespace App\Models\Administrator;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\AttendancePmFactory;

class AttendancePm extends Model
{
    use HasFactory;

    protected $fillable = [
        'pm_time_in',
        'pm_time_out',
    ];

    protected static function newFactory()
    {
        return AttendancePmFactory::new();
    }

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }
}
