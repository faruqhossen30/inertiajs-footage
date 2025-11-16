- Ensure the jobs table exists and storage symlink is created:
  - php artisan migrate
  - php artisan storage:link
- Configure .env for background workers:
  - QUEUE_CONNECTION=database
- Enqueue all pending videos (where status = list ):
  - php artisan videos:enqueue
- Start the worker (single process ensures one-by-one execution):
  - php artisan queue:work --queue=video-downloads --sleep=1 --tries=3
Optional Usage

- Enqueue a single video from code:
  - \App\Jobs\DownloadVideo::dispatch($video->id);
- Downloaded file URL (if you need to serve it):
  - Storage::disk('public')->url($video->file_path)
Notes

- The Video table already uses status enum ['list','run','done'] , matching your requested states.
- If two videos point to the same remote file name, they’ll save under the same name; if you need unique names per video, we can append video_{id} to the basename.
- Large file downloads are streamed to avoid memory pressure; network errors will revert status to list for later retry.

Update Added

- Service DownloadService now includes downloadThumbnail(Video $video) which streams the image to storage/app/public/thumbnails/... and returns the relative path.
- Job DownloadVideo now:
  - Downloads the main video and sets file_path .
  - If video.thumbnail is a remote URL ( http/https ), downloads it and updates thumbnail with the local relative path.
  - Keeps the status flow: run at start, done after updates; logs a warning if thumbnail download fails but does not fail the whole job.
How To Use

- Ensure storage:link is created: php artisan storage:link .
- With QUEUE_CONNECTION=database , enqueue and run as before:
  - php artisan videos:enqueue
  - php artisan queue:work --queue=video-downloads --sleep=1 --tries=3
Serving Files

- Video URL: Storage::disk('public')->url($video->file_path)
- Thumbnail URL: Storage::disk('public')->url($video->thumbnail)
If you prefer unique filenames per video to avoid collisions across same provider names, I can update both downloaders to

Queue worker

- Ensure the worker is running to process downloads:
  - php artisan queue:work --queue=video-downloads
Optional tweaks

- If you’d like a separate card for “Enqueue only provider X” or “Enqueue a specific video id,” I can add route variants and card props to target those filters.

- macOs `sudo ln -s /Volumes/Files/server "/Volumes/Files/project/laravel/inertiajs-footage/public"`