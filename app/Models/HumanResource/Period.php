<?php

namespace App\Models\HumanResource;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = ['employee_id','period', 'particulars'];

    // Relationships
    public function vacationLeaves()
    {
        return $this->hasMany(VacationLeave::class);
    }

    public function sickLeaves()
    {
        return $this->hasMany(SickLeave::class);
    }
}
