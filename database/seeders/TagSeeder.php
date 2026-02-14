<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            '4K',
            'HD',
            'Aerial',
            'Slow Motion',
            'Nature',
            'Urban',
            'People',
            'Animals',
            'Technology',
            'Business',
            'Timelapse',
            'Abstract',
        ];

        foreach ($tags as $tagName) {
            Tag::firstOrCreate(
                ['name' => $tagName],
                [
                    'slug' => Str::slug($tagName),
                    'status' => true,
                ]
            );
        }
    }
}
