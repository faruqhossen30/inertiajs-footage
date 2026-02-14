<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorySubCategories = [
            'Travel' => ['Europe', 'Asia', 'America', 'Africa'],
            'Product' => ['Tech', 'Home', 'Fashion', 'Beauty'],
            'Top 10' => ['Movies', 'Games', 'Places', 'Food'],
            'Nature' => ['Forests', 'Oceans', 'Mountains', 'Animals'],
        ];

        foreach ($categorySubCategories as $categoryName => $subCategoryNames) {
            $category = Category::where('name', $categoryName)->first();

            if (! $category) {
                // Fallback if category doesn't exist
                $category = Category::create([
                    'name' => $categoryName,
                    // 'slug' => Str::slug($categoryName), // Removed slug
                    'user_id' => 1,
                    'status' => 1,
                ]);
            }

            foreach ($subCategoryNames as $subName) {
                SubCategory::firstOrCreate(
                    [
                        'category_id' => $category->id,
                        'name' => $subName,
                    ],
                    [
                        'slug' => Str::slug($subName),
                        'description' => "Description for $subName",
                        'user_id' => 1,
                        'status' => 1,
                    ]
                );
            }
        }
    }
}
