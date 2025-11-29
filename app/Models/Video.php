<?php

namespace App\Models;

use App\Enums\VideoProvider;
use App\Enums\VideoStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        'status',

    ];

    protected function casts(): array
    {
        return [
            // Note: column name is 'povider' in schema; cast accordingly
            'povider' => VideoProvider::class,
            'status' => VideoStatus::class,
        ];
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'tag_video')
            ->using(VideoTag::class)
            ->withTimestamps();
    }
}
