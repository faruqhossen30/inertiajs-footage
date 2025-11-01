<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TemplateProperty extends Model
{
    protected $fillable = [
        'template_id',
        'name',
        'key',
        'value',
        'type',
        'sort_order'
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Get the template that owns the property.
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    /**
     * Get the property type definition.
     */
    public function propertyType(): BelongsTo
    {
        return $this->belongsTo(PropertyType::class, 'type', 'slug');
    }

    /**
     * Scope to order properties by sort_order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('key');
    }

    /**
     * Get property value with type casting.
     */
    public function getTypedValueAttribute()
    {
        $propertyType = $this->propertyType;
        
        if (!$propertyType) {
            return $this->value;
        }

        switch ($propertyType->slug) {
            case 'boolean':
                return filter_var($this->value, FILTER_VALIDATE_BOOLEAN);
            case 'number':
            case 'integer':
                return is_numeric($this->value) ? (int) $this->value : 0;
            case 'float':
                return is_numeric($this->value) ? (float) $this->value : 0.0;
            case 'color':
                return $this->value; // Color values are already in correct format
            case 'range':
                return is_numeric($this->value) ? (float) $this->value : 0;
            case 'select':
                return $this->value; // Selected option value
            case 'json':
                return json_decode($this->value, true);
            default:
                return $this->value;
        }
    }

    /**
     * Validate the property value against its type.
     */
    public function validateValue()
    {
        $propertyType = $this->propertyType;
        
        if (!$propertyType) {
            return true;
        }

        return $propertyType->validateValue($this->value);
    }

    /**
     * Get the input configuration for this property.
     */
    public function getInputConfig()
    {
        $propertyType = $this->propertyType;
        
        if (!$propertyType) {
            return [
                'type' => 'text',
                'config' => []
            ];
        }

        return [
            'type' => $propertyType->input_type,
            'config' => $propertyType->config ?? []
        ];
    }
}
