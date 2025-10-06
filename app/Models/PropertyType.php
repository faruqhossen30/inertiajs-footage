<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PropertyType extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'input_type',
        'validation_rules',
        'config',
        'is_active'
    ];

    protected $casts = [
        'validation_rules' => 'array',
        'config' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the template properties that use this type.
     */
    public function templateProperties(): HasMany
    {
        return $this->hasMany(TemplateProperty::class, 'type', 'slug');
    }

    /**
     * Scope to get only active property types.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get validation rules for this property type.
     */
    public function getValidationRules()
    {
        return $this->validation_rules ?? [];
    }

    /**
     * Get configuration for this property type.
     */
    public function getConfig($key = null)
    {
        if ($key === null) {
            return $this->config ?? [];
        }
        
        return $this->config[$key] ?? null;
    }

    /**
     * Validate value based on property type.
     */
    public function validateValue($value)
    {
        $rules = $this->getValidationRules();
        
        switch ($this->slug) {
            case 'text':
                return is_string($value);
            case 'number':
            case 'integer':
                return is_numeric($value);
            case 'boolean':
                return is_bool($value) || in_array($value, ['true', 'false', '1', '0', 1, 0]);
            case 'color':
                return preg_match('/^#[0-9A-Fa-f]{6}$/', $value);
            case 'range':
                $min = $this->getConfig('min');
                $max = $this->getConfig('max');
                return is_numeric($value) && $value >= $min && $value <= $max;
            case 'select':
                $options = $this->getConfig('options');
                return in_array($value, $options);
            case 'json':
                return is_string($value) && json_decode($value) !== null;
            default:
                return true;
        }
    }
}
