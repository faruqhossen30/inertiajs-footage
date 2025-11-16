<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboarController extends Controller
{
    public function index()
    {

        // $vides = Video::selectRaw("
        //             COUNT(CASE WHEN status = 'list' THEN status ELSE 0 END) AS total_list,
        //             COUNT(CASE WHEN status = 'run' THEN status ELSE 0 END) AS total_run,
        //             COUNT(CASE WHEN status = 'done' THEN status ELSE 0 END) AS total_done
        //         ")->first();


        $total_list = Video::where('status', 'list')->count();
        $total_run = Video::where('status', 'run')->count();
        $total_done = Video::where('status', 'done')->count();

        $vides = [
            'total_list' => $total_list,
            'total_run' => $total_run,
            'total_done' => $total_done,
        ];



        // return $vides;

        return Inertia::render('Admin/Dashboard', ['videos'=> $vides]);
    }
}
