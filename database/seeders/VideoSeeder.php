<?php

namespace Database\Seeders;

use App\Enums\VideoProvider;
use App\Enums\VideoStatus;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have categories, subcategories, and tags
        if (Category::count() == 0) {
            $this->call(CategorySeeder::class);
        }
        if (SubCategory::count() == 0) {
            $this->call(SubCategorySeeder::class);
        }
        if (Tag::count() == 0) {
            $this->call(TagSeeder::class);
        }

        $categories = Category::all();
        $subCategories = SubCategory::all();
        $tags = Tag::all();

        for ($i = 1; $i <= 300; $i++) {
            $video = Video::firstOrCreate(
                ['title' => fake()->sentence()],
                [
                    'file_name' => 'sample_video_' . $i . '.mp4',
                    'file_path' => '/videos/sample_' . $i . '.mp4',
                    // 'folder' => 'samples', // Removed as column doesn't exist
                    'duration' => rand(60, 300),
                    'thumbnail' => 'https://via.placeholder.com/640x360.png?text=Video+' . $i,
                    'video_quality' => '1080p',
                    'size' => rand(1000000, 50000000), // 1MB to 50MB
                    'width' => 1920,
                    'height' => 1080,
                    'povider' => VideoProvider::ALL,
                    'povider_id' => 'prov_' . $i,
                    'status' => VideoStatus::DONE,
                ]
            );

            // Only attach relationships if the video is new or has no categories
            if ($video->categories()->count() == 0) {
                $randomCategories = $categories->random(rand(1, 2));
                $video->categories()->attach($randomCategories->pluck('id'));

                // Attach random SubCategories
                $relevantSubCategories = $subCategories->whereIn('category_id', $randomCategories->pluck('id'));
                
                if ($relevantSubCategories->count() > 0) {
                    $randomSubCategories = $relevantSubCategories->random(min($relevantSubCategories->count(), rand(1, 2)));
                    $video->subCategories()->attach($randomSubCategories->pluck('id'));
                } else {
                     $randomSubCategories = $subCategories->random(rand(1, 2));
                     $video->subCategories()->attach($randomSubCategories->pluck('id'));
                }
            }

            // Attach random Tags
            if ($video->tags()->count() == 0) {
                $video->tags()->attach($tags->random(rand(1, 4))->pluck('id'));
            }
        }
    }
}
