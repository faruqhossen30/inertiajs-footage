<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'thumbnail', 'user_id', 'status'];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
