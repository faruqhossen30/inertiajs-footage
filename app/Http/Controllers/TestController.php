<?php

namespace App\Http\Controllers;

use App\Services\DownloadService;
use Illuminate\Http\Request;

class TestController extends Controller
{
    // protected $downloadService;
    // protected function __construct(DownloadService $downloadService)
    // {
    //     $this->downloadService = $downloadService;
    // }

    public function index(Request $request)
    {
        $downloadService = new DownloadService;

        return $downloadService->downloadImage();

        // return $this->downloadService->downloadImage();
        // return $request->user();
    }
}
