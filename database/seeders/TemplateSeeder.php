<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Intro',
                'description' => 'Intro Template'
            ],
            [
                'name' => 'Video',
                'description' => 'Video Template'
            ],
            [
                'name' => 'Blog',
                'description' => 'Blog Template'
            ]
        ];

        Template::insert($templates);
    }
}
