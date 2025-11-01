<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoTemplate extends Model
{
    protected $fillable = [
        'video_id',
        'template_id',
        'start',
        'duration',
        'properties',
    ];

    protected $casts = [
        'start' => 'integer',
        'duration' => 'integer',
        'properties' => 'array',
    ];

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }
}
