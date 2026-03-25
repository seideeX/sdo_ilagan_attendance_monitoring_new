<?php

namespace App\Models;

use App\Models\Administrator\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationForLeave extends Model
{
    /** @use HasFactory<\Database\Factories\ApplicationForLeaveFactory> */
    use HasFactory;
    protected $table = 'applications_for_leave';

    protected $fillable = [
        'employee_id',
        'type_of_leave',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
