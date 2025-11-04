<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Video extends Model
{
    protected $fillable = [
        'title',
        'file_name',
        'file_path',
        'folder',
        'duration',
        'thumbnail',
        'video_qulity',
        'size',
        'width',
        'height',
        'povider',
        'povider_id',
        'file_name',
        'file_path',
        'status'

    ];

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'tag_video')
            ->using(VideoTag::class)
            ->withTimestamps();
    }

}
