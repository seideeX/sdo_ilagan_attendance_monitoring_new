<?php

namespace App\Models\HumanResource;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\SickLeaveFactory;
use App\Models\Administrator\Employee;

class SickLeave extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'period_id',
        'earned',
        'used_wpay',
        'balance',
        'used_wopay',
        'remarks',
    ];

    /**
     * Explicitly link the factory for this model
     */
    protected static function newFactory()
    {
        return SickLeaveFactory::new();
    }
        public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    public function period()
    {
        return $this->belongsTo(Period::class);
    }
}
