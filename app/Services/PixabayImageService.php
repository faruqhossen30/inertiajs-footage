<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PixabayImageService
{
    private string $apiKey;
    private string $baseUrl = 'https://pixabay.com/api/';
    private int $rateLimitRemaining = 100;
    private int $rateLimitReset = 60;

    public function __construct()
    {
        $this->apiKey = config('services.pixabay.key', '');
    }
    
}