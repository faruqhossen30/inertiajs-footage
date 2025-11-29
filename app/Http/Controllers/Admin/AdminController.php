<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = User::with('roles')->latest()->paginate(10);

        // return $admins;
        return Inertia::render('Admin/Admin/Index', ['admins' => $admins]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Admin/Create', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'min:8', 'confirmed'],
            'roleIds' => 'required|array',
            'roleIds.*' => 'exists:roles,id',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        $user = User::create($data);
        $user->syncRoles($request->roleIds);

        return redirect()->route('admin.index')
            ->with('success', 'Admin successfully created');
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
        $admin = User::where('id', $id)->first();
        $roles = Role::all();

        return Inertia::render('Admin/Admin/Edit', ['admin' => $admin, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => ['nullable', 'min:8', 'confirmed'],
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        $admin = User::findOrFail($id);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $admin->update($updateData);
        $admin->syncRoles($request->role_ids);

        return redirect()->route('admin.index')
            ->with('success', 'Admin successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = User::findOrFail($id);

        // Prevent self-deletion
        if ($admin->id === auth()->id()) {
            return redirect()->route('admin.index')
                ->with('error', 'You cannot delete your own account');
        }

        $admin->delete();

        return redirect()->route('admin.index')
            ->with('success', 'Admin successfully deleted');
    }
}
