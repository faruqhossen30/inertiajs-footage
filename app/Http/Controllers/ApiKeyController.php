<?php

namespace App\Http\Controllers;

use App\Models\ApiKey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiKeyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $apiKeys = ApiKey::paginate(10);

        // return $categories;
        return Inertia::render('Admin/ApiKey/Index', ['apiKeys' => $apiKeys]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ApiKey/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'key' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'key' => $request->key,
            'email' => $request->email,
        ];

        ApiKey::create($data);

        return to_route('api-key.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $apiKey = ApiKey::where('id', $id)->first();

        return Inertia::render('Admin/ApiKey/Edit', ['apiKey' => $apiKey]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'key' => 'required',
            'email' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'key' => $request->key,
            'email' => $request->email,
        ];

        ApiKey::firstwhere('id', $id)->update($data);

        return to_route('api-key.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ApiKey::where('id', $id)->delete();

        return redirect()->route('api-key.index');
    }
}
