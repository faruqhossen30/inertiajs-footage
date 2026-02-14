<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Travel',
                'user_id' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Product',
                'user_id' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Top 10',
                'user_id' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Nature',
                'user_id' => 1,
                'status' => 1,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                [
                    'slug' => Str::slug($category['name']),
                    'user_id' => $category['user_id'],
                    'status' => $category['status'],
                ]
            );
        }
    }
}
