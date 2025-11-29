<?php

namespace Database\Seeders;

use App\Models\ApiKey;
use Illuminate\Database\Seeder;

class ApiKeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ApiKey::create([
            'name' => 'Pixabay',
            'key' => '52396754-670cefac1a5a1c5285473e2fb',
            'email' => 'faruqhossen30@gmail.com',
        ]);
    }
}
