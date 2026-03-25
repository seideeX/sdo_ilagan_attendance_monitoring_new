<?php

namespace App\Models\HumanResource;

use Illuminate\Database\Eloquent\Model;
use App\Models\Administrator\TardinessRecord;

class ConvertedTardyRecords extends Model
{
    protected $table = 'converted_tardy_records';

    protected $fillable = [
        'tardy_convertion_id',
        'tardiness_record_id',
    ];

    public function tardyConvertion()
    {
        return $this->belongsTo(TardyConvertion::class);
    }

    public function tardinessRecord()
    {
        return $this->belongsTo(TardinessRecord::class);
    }   
}
