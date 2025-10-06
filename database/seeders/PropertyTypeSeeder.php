<?php

namespace Database\Seeders;

use App\Models\PropertyType;
use Illuminate\Database\Seeder;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyTypes = [
            [
                'name' => 'Text Input',
                'slug' => 'text',
                'description' => 'Simple text input field',
                'input_type' => 'text',
                'validation_rules' => ['string', 'max:255'],
                'config' => [
                    'placeholder' => 'Enter text...',
                    'max_length' => 255
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Number Input',
                'slug' => 'number',
                'description' => 'Numeric input field',
                'input_type' => 'number',
                'validation_rules' => ['numeric'],
                'config' => [
                    'step' => 1,
                    'placeholder' => 'Enter number...'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Integer Input',
                'slug' => 'integer',
                'description' => 'Integer input field',
                'input_type' => 'number',
                'validation_rules' => ['integer'],
                'config' => [
                    'step' => 1,
                    'placeholder' => 'Enter integer...'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Float Input',
                'slug' => 'float',
                'description' => 'Decimal number input field',
                'input_type' => 'number',
                'validation_rules' => ['numeric'],
                'config' => [
                    'step' => 0.01,
                    'placeholder' => 'Enter decimal...'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Range Slider',
                'slug' => 'range',
                'description' => 'Range slider with min and max values',
                'input_type' => 'range',
                'validation_rules' => ['numeric', 'min:0', 'max:100'],
                'config' => [
                    'min' => 0,
                    'max' => 100,
                    'step' => 1,
                    'default' => 50
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Color Picker',
                'slug' => 'color',
                'description' => 'Color picker for hex color codes',
                'input_type' => 'color',
                'validation_rules' => ['regex:/^#[0-9A-Fa-f]{6}$/'],
                'config' => [
                    'default' => '#000000',
                    'format' => 'hex'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Boolean Toggle',
                'slug' => 'boolean',
                'description' => 'True/false toggle switch',
                'input_type' => 'checkbox',
                'validation_rules' => ['boolean'],
                'config' => [
                    'true_label' => 'Yes',
                    'false_label' => 'No',
                    'default' => false
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Select Dropdown',
                'slug' => 'select',
                'description' => 'Dropdown selection with predefined options',
                'input_type' => 'select',
                'validation_rules' => ['string'],
                'config' => [
                    'options' => [
                        ['value' => 'option1', 'label' => 'Option 1'],
                        ['value' => 'option2', 'label' => 'Option 2'],
                        ['value' => 'option3', 'label' => 'Option 3']
                    ],
                    'placeholder' => 'Select an option...'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Textarea',
                'slug' => 'textarea',
                'description' => 'Multi-line text input',
                'input_type' => 'textarea',
                'validation_rules' => ['string', 'max:1000'],
                'config' => [
                    'rows' => 4,
                    'placeholder' => 'Enter text...',
                    'max_length' => 1000
                ],
                'is_active' => true,
            ],
            [
                'name' => 'JSON Input',
                'slug' => 'json',
                'description' => 'JSON formatted data input',
                'input_type' => 'textarea',
                'validation_rules' => ['json'],
                'config' => [
                    'rows' => 6,
                    'placeholder' => '{"key": "value"}',
                    'format' => 'json'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Email Input',
                'slug' => 'email',
                'description' => 'Email address input field',
                'input_type' => 'email',
                'validation_rules' => ['email'],
                'config' => [
                    'placeholder' => 'Enter email address...'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'URL Input',
                'slug' => 'url',
                'description' => 'URL input field',
                'input_type' => 'url',
                'validation_rules' => ['url'],
                'config' => [
                    'placeholder' => 'https://example.com'
                ],
                'is_active' => true,
            ],
        ];

        foreach ($propertyTypes as $propertyType) {
            PropertyType::updateOrCreate(
                ['slug' => $propertyType['slug']],
                $propertyType
            );
        }
    }
}