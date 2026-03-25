<?php

namespace App\Models;

use App\Models\Administrator\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentHead extends Model
{
    /** @use HasFactory<\Database\Factories\DepartmentHeadFactory> */
    use HasFactory;

    protected $fillable = [
        'department',
        'employee_id',
        'status'
    ];

    public function head()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
