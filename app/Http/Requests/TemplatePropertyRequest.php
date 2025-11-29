<?php

namespace App\Http\Requests;

use App\Models\PropertyType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TemplatePropertyRequest extends FormRequest
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
        $templatePropertyId = $this->route('template_property')?->id;
        $templateId = $this->input('template_id');

        return [
            'template_id' => 'required|exists:templates,id',
            'key' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9_-]+$/',
                Rule::unique('template_properties', 'key')
                    ->where('template_id', $templateId)
                    ->ignore($templatePropertyId),
            ],
            'value' => 'nullable|string',
            'type' => 'required|exists:property_types,slug',
            'sort_order' => 'integer|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'key.regex' => 'The key may only contain letters, numbers, hyphens, and underscores.',
            'key.unique' => 'This key already exists for the selected template.',
            'type.exists' => 'The selected property type does not exist.',
            'template_id.exists' => 'The selected template does not exist.',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Validate value based on property type
            if ($this->has('type') && $this->has('value')) {
                $propertyType = PropertyType::where('slug', $this->type)->first();

                if ($propertyType && ! $propertyType->validateValue($this->value)) {
                    $validator->errors()->add(
                        'value',
                        "The value is not valid for the selected property type '{$propertyType->name}'."
                    );
                }
            }
        });
    }
}
