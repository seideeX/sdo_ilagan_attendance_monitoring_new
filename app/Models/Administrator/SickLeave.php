<?php

namespace App\Models\Administrator;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SickLeave extends Model
{
    use HasFactory;

    protected $table = 'sick_leave_management'; // <-- new table name
    protected $fillable = ['employee_id', 'date'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
