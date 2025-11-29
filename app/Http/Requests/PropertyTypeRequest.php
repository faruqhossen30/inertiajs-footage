<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PropertyTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $propertyTypeId = $this->route('property_type')?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('property_types', 'name')->ignore($propertyTypeId),
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9_-]+$/',
                Rule::unique('property_types', 'slug')->ignore($propertyTypeId),
            ],
            'description' => 'nullable|string|max:1000',
            'input_type' => 'required|string|in:text,number,email,url,color,range,checkbox,select,textarea,file',
            'validation_rules' => 'nullable|array',
            'validation_rules.*' => 'string',
            'config' => 'nullable|array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, hyphens, and underscores.',
            'slug.unique' => 'This slug is already taken.',
            'name.unique' => 'This name is already taken.',
            'input_type.in' => 'The input type must be one of: text, number, email, url, color, range, checkbox, select, textarea, file.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert validation_rules and config to arrays if they're JSON strings
        if ($this->has('validation_rules') && is_string($this->validation_rules)) {
            $this->merge([
                'validation_rules' => json_decode($this->validation_rules, true),
            ]);
        }

        if ($this->has('config') && is_string($this->config)) {
            $this->merge([
                'config' => json_decode($this->config, true),
            ]);
        }
    }
}
