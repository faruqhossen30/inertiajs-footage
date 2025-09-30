<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $channels = Channel::paginate(10);
        // return $channels;
        return Inertia::render('Admin/Channel/Index',['channels'=> $channels]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Channel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required'
        ]);

        $data=[
            'name'=> $request->name,
            'channel_url'=> $request->channel_url,
        ];
        Channel::create($data);

        return to_route('channel.index');
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
        $channel = Channel::where('id', $id)->first();
        return Inertia::render('Admin/Channel/Edit', ['channel'=>$channel]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'=>'required'
        ]);

        $data=[
            'name'=> $request->name,
            'channel_url'=> $request->channel_url,
        ];

        Channel::firstwhere('id', $id)->update($data);
        return to_route('channel.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Channel::where('id', $id)->delete();
        return redirect()->route('channel.index');
    }
}
