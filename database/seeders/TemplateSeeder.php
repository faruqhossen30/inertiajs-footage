<?php

namespace Database\Seeders;

use App\Models\Template;
use App\Models\TemplateProperty;
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

        $template_properties = array(
            array('id' => '1', 'template_id' => '1', 'key' => 'title', 'value' => 'this is title 1', 'type' => 'text', 'sort_order' => '1', 'created_at' => '2025-10-07 09:46:53', 'updated_at' => '2025-10-07 09:46:53'),
            array('id' => '2', 'template_id' => '1', 'key' => 'subtitle', 'value' => 'subtitle text', 'type' => 'text', 'sort_order' => '2', 'created_at' => '2025-10-07 09:47:12', 'updated_at' => '2025-10-07 09:47:12'),
            array('id' => '3', 'template_id' => '1', 'key' => 'color', 'value' => '#b88989', 'type' => 'color', 'sort_order' => '3', 'created_at' => '2025-10-07 09:47:51', 'updated_at' => '2025-10-07 09:47:51'),
            array('id' => '4', 'template_id' => '2', 'key' => 'title', 'value' => 'this is title 1', 'type' => 'text', 'sort_order' => '1', 'created_at' => '2025-10-07 09:46:53', 'updated_at' => '2025-10-07 09:46:53'),
            array('id' => '5', 'template_id' => '2', 'key' => 'subtitle', 'value' => 'subtitle text', 'type' => 'text', 'sort_order' => '2', 'created_at' => '2025-10-07 09:47:12', 'updated_at' => '2025-10-07 09:47:12'),
            array('id' => '6', 'template_id' => '2', 'key' => 'color', 'value' => '#b88989', 'type' => 'color', 'sort_order' => '3', 'created_at' => '2025-10-07 09:47:51', 'updated_at' => '2025-10-07 09:47:51'),
            array('id' => '7', 'template_id' => '3', 'key' => 'location', 'value' => 'Bangladesh', 'type' => 'text', 'sort_order' => '1', 'created_at' => '2025-10-07 09:55:33', 'updated_at' => '2025-10-07 09:55:33'),
            array('id' => '8', 'template_id' => '3', 'key' => 'address', 'value' => 'Dhaka, Bangladesh', 'type' => 'text', 'sort_order' => '2', 'created_at' => '2025-10-07 09:56:37', 'updated_at' => '2025-10-07 09:56:37')
        );

        TemplateProperty::insert($template_properties);
    }
}
