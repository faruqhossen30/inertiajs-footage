<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name'    => 'Travel',
                'user_id' => 1,
                'status'  => 1,
            ],
            [
                'name'    => 'Product',
                'user_id' => 1,
                'status'  => 1,
            ],
            [
                'name'    => 'Top 10',
                'user_id' => 1,
                'status'  => 1,
            ],
            [
                'name'    => 'Travel',
                'user_id' => 1,
                'status'  => 1,
            ]
        ];
    }
}
