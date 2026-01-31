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

Artisan::command('videos:download-thumbnails', function (App\Services\DownloadService $downloader) {
    $videos = Video::query()
        ->where('thumbnail', 'LIKE', 'http%')
        ->get();

    if ($videos->isEmpty()) {
        $this->info('No videos with remote thumbnails found.');
        return 0;
    }

    $this->info('Found '.$videos->count().' videos with remote thumbnails.');

    $bar = $this->output->createProgressBar($videos->count());
    $bar->start();

    foreach ($videos as $video) {
        try {
            $path = $downloader->downloadThumbnail($video);
            $video->update(['thumbnail' => $path]);
        } catch (\Throwable $e) {
            // Log error but continue
            $this->newLine();
            $this->error('Failed to download thumbnail for video '.$video->id.': '.$e->getMessage());
        }
        $bar->advance();
    }

    $bar->finish();
    $this->newLine();
    $this->info('Thumbnail downloads completed.');

    return 0;
})->purpose('Download thumbnails for videos that have remote thumbnail URLs');
