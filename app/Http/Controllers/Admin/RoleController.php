<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions')->latest()->paginate(10);
        return Inertia::render('Admin/Role/Index', [
            'roles' => $roles,
            'flash' => [
                'success' => Session::get('success'),
                'error' => Session::get('error'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all()->groupBy('module_name');
        return Inertia::render('Admin/Role/Create', [
            'permissions' => $permissions,
            'flash' => [
                'error' => Session::get('error'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoleRequest $request)
    {
        $createdRole = Role::create(['name' => $request->validated('name')]);
        $permissions = array_map('intval', $request->validated('permissionIds'));
        $createdRole->syncPermissions($permissions);

        Session::flash('success', 'Role successfully created');
        return redirect()->route('role.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::with('permissions')->findById($id);
        return Inertia::render('Admin/Role/Show', [
            'role' => $role,
            'flash' => [
                'error' => Session::get('error'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::findById($id);
        $rolePermissions = $role->permissions()->pluck('id')->toArray();
        $permissions = Permission::all()->groupBy('module_name');
        return Inertia::render('Admin/Role/Edit', [
            'role' => $role, 
            'rolePermissions' => $rolePermissions, 
            'permissions' => $permissions,
            'flash' => [
                'error' => Session::get('error'),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update(['name' => $request->validated('name')]);
        $role->syncPermissions(array_map('intval', $request->validated('permissionIds')));
        
        Session::flash('success', 'Role successfully updated');
        return redirect()->route('role.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findById($id);
        
        // Check if role is assigned to any users
        if ($role->users()->count() > 0) {
            Session::flash('error', 'Cannot delete role that is assigned to users');
            return redirect()->route('role.index');
        }
        
        $role->delete();
        
        Session::flash('success', 'Role successfully deleted');
        return redirect()->route('role.index');
    }
}
