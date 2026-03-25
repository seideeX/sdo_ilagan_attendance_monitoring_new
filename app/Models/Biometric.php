<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Administrator\Employee;

class Biometric extends Model
{
    protected $fillable = [
        'employee_id', 
        'fingerprint_template',
        'finger_index'
    ];

    protected $hidden = ['fingerprint_template'];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}

