<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_categories()
    {
        Category::factory()->count(3)->create();

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'description',
                        'thumbnail',
                        'sub_categories',
                    ]
                ]
            ]);
    }

    public function test_can_show_category()
    {
        $category = Category::factory()->create();
        SubCategory::factory()->count(2)->create(['category_id' => $category->id]);

        $response = $this->getJson("/api/categories/{$category->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $category->id,
                    'name' => $category->name,
                ]
            ])
            ->assertJsonCount(2, 'data.sub_categories');
    }

    public function test_can_list_sub_categories()
    {
        SubCategory::factory()->count(3)->create();

        $response = $this->getJson('/api/sub-categories');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'category_id',
                        'name',
                        'slug',
                        'description',
                        'thumbnail',
                        'category',
                    ]
                ]
            ]);
    }

    public function test_can_show_sub_category()
    {
        $subCategory = SubCategory::factory()->create();

        $response = $this->getJson("/api/sub-categories/{$subCategory->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $subCategory->id,
                    'name' => $subCategory->name,
                    'category_id' => $subCategory->category_id,
                ]
            ]);
    }
}
