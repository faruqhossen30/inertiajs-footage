<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Video extends Model
{
    protected $fillable = [
        'title',
        'folder',
        'status',
    ];

    /**
     * Timeline: templates placed on the video with timing and property values
     */
    public function templates(): HasMany
    {
        return $this->hasMany(VideoTemplate::class)->orderBy('start');
    }
}
