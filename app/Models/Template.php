<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'name',
        'channel_id',
        'template_file',
    ];

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }
}
