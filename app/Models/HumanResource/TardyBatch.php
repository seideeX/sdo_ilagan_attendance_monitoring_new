<?php

namespace App\Models\HumanResource;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TardyBatch extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'batch_code' ,
        'start_month' ,
        'end_month' , 
    ];

    public function tardyConvertions()
    {
        return $this->hasMany(TardyConvertion::class, 'batch_id');
    }
}
