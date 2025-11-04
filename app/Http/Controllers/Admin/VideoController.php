<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\Video;
use App\Models\VideoTemplate;
use App\Models\VideoTemplateFootage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $videos = Video::latest('id')->paginate(10);
        return Inertia::render('Admin/Video/Index', ['videos' => $videos]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $show = null;
        if (isset($_GET['show']) && $_GET['show']) {
            $show = $_GET['show'];
        }

        $search = null;
        if (isset($_GET['search']) && $_GET['search']) {
            $search = $_GET['search'];
        }

        $provider = null;
        if (isset($_GET['provider']) && $_GET['provider']) {
            $provider = $_GET['provider'];
        }
        $key = env('PIXABAY_API_KEY');
        $query = $search;

        $params = [
            'key' => $key,
            'q' => $search,
            'order'=> 'popular',
            'page'=> 1,
            'per_page'=> 5,
        ];

        // $queryParams =  http_build_query($params);
        // $url = "https://pixabay.com/api/videos/?{$queryParams}";
        // $response = Http::get($url);
        // $data = $response->json();
        // return $data['hits'];



        return Inertia::render('Admin/Video/PixabayVideos', ['data' => []]);
    }

    public function pixabayStore(Request $request)
    {
        $videos = $request->videos;

        foreach ($videos as $video) {
            Video::create([
                'povider'=> 'pixabay',
                'povider_id' => $video['id'],
                'file_name' => $video['url'],
                'thumbnail' => $video['thumbnail'],
            ]);
        }

        return "store";
    }

    public function store(Request $request)
    {
        
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Video::where('id', $id)->delete();
        return redirect()->route('video.index');



        $show = null;
        if (isset($_GET['show']) && $_GET['show']) {
            $show = $_GET['show'];
        }

        $products = Product::query();

        if (isset($_GET['district']) && $_GET['district']) {
            $district = $_GET['district'];
            // $products = $products->where('district_id', $district);
            return $district;
        }

        if (isset($_GET['cat']) && $_GET['cat']) {
            $cat = $_GET['cat'];
            $products = $products->whereIn('category_id', $cat);
        }
        if (isset($_GET['brand']) && $_GET['brand']) {
            $brands = $_GET['brand'];
            $products = $products->whereIn('brand_id', $brands);
        }

        if (isset($_GET['feature']) && $_GET['feature']) {
            $feature = $_GET['feature'];
            $products = $products->whereHas('features', function ($query) use ($feature) {
                return $query->whereIn('feature_id', $feature);
            });
        }

        if (isset($_GET['search']) && $_GET['search']) {
            $search = $_GET['search'];
            $products = $products->where('title', 'like', '%' . $search . '%');
        }

        if (isset($_GET['orderby']) && $_GET['orderby']) {
            $orderby = $_GET['orderby'];
            $products = $products->orderBy('created_at', $orderby);
        }


        if (isset($_GET['sort']) && $_GET['sort']) {
            $sort = $_GET['sort'];
            $products = $products->orderBy('price', $sort);
        }

        $products = $products->latest()->paginate($show ?? 10)->appends($_GET);
        $brands = Brand::get();

    }
}
