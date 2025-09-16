<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = collect([

            // Admin
            // ['name' => 'admin list',   'module_name' => 'admin'],
            // ['name' => 'admin create', 'module_name' => 'admin'],
            // ['name' => 'admin update', 'module_name' => 'admin'],
            // ['name' => 'admin delete', 'module_name' => 'admin'],
            // ['name' => 'admin show',   'module_name' => 'admin'],

            // Roll
            // ['name' => 'role list',   'module_name' => 'role'],
            // ['name' => 'role create', 'module_name' => 'role'],
            // ['name' => 'role update', 'module_name' => 'role'],
            // ['name' => 'role delete', 'module_name' => 'role'],
            // ['name' => 'role show',   'module_name' => 'role'],




            // permission
            ['name' => 'permission list',   'module_name' => 'permission'],
            ['name' => 'permission create', 'module_name' => 'permission'],
            ['name' => 'permission update', 'module_name' => 'permission'],
            ['name' => 'permission delete', 'module_name' => 'permission'],
            ['name' => 'permission show',   'module_name' => 'permission'],
            // user
            // ['name' => 'user list',   'module_name' => 'user'],
            // ['name' => 'user create', 'module_name' => 'user'],
            // ['name' => 'user update', 'module_name' => 'user'],
            // ['name' => 'user delete', 'module_name' => 'user'],
            // ['name' => 'user show',   'module_name' => 'user'],
            // category
            ['name' => 'category list',   'module_name' => 'category'],
            ['name' => 'category create', 'module_name' => 'category'],
            ['name' => 'category update', 'module_name' => 'category'],
            ['name' => 'category delete', 'module_name' => 'category'],
            ['name' => 'category show',   'module_name' => 'category'],

            // Blog
            ['name' => 'blog list',   'module_name' => 'blog'],
            ['name' => 'blog create', 'module_name' => 'blog'],
            ['name' => 'blog update', 'module_name' => 'blog'],
            ['name' => 'blog delete', 'module_name' => 'blog'],
            ['name' => 'blog show',   'module_name' => 'blog'],
            // // Setting

            // ['name' => 'websitesetting',       'module_name' => 'setting'],
            // ['name' => 'socialmedia setting',  'module_name' => 'setting'],
            // ['name' => 'contactsetting',       'module_name' => 'setting'],



        ]);

        $web = collect([]);

        $permissions->map(function ($permission) use ($web) {
            $web->push([
                'name' => $permission['name'],
                'module_name' => $permission['module_name'],
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });


        Permission::insert($web->toArray());
        $r = Role::create([
            'name'=>'Super Admin'
        ]);
        $permissions = Permission::pluck('id','id')->all();
        $r->syncPermissions($permissions);

        $user = User::firstWhere('id',1);

        $user->assignRole(1);

    }

}
