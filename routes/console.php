<?php

use App\Jobs\DownloadVideo;
use App\Models\Video;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Bus;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('videos:enqueue', function () {
    $videos = Video::query()
        ->where('status', 'list')
        ->orderBy('id')
        ->get();

    if ($videos->isEmpty()) {
        $this->info('No pending videos to enqueue.');

        return 0;
    }

    $jobs = [];
    foreach ($videos as $video) {
        $jobs[] = new DownloadVideo($video->id);
    }

    Bus::chain($jobs)->dispatch();

    $this->info('Enqueued '.count($jobs).' video downloads. They will run one-by-one.');

    return 0;
})->purpose('Enqueue pending video downloads to run sequentially in the background');
