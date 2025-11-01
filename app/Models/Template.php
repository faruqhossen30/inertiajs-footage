<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'name',
        'description',
        'file_name',
        'file_path',
        'thumbnail',
        'pc',
        'status'
    ];

    /**
     * Get the template properties for the template.
     */
    public function properties(): HasMany
    {
        return $this->hasMany(TemplateProperty::class)->ordered();
    }

    /**
     * Get a specific property by key.
     */
    public function getProperty($key)
    {
        return $this->properties()->where('key', $key)->first();
    }

    /**
     * Get property value by key.
     */
    public function getPropertyValue($key, $default = null)
    {
        $property = $this->getProperty($key);
        return $property ? $property->typed_value : $default;
    }

    /**
     * Set a property value.
     */
    public function setProperty($key, $value, $type = 'text', $sortOrder = 0)
    {
        return $this->properties()->updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'sort_order' => $sortOrder
            ]
        );
    }
}
