<?php

namespace App\Models;

use App\Models\Administrator\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
    ];

    // relationship
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
