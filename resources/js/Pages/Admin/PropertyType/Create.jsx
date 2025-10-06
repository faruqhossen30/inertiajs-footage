import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { Input } from '@/Components/input';
import { Textarea } from '@/Components/textarea';
import { Select } from '@/Components/select';
import { Switch } from '@/Components/switch';
import { ArrowLeft, Save } from 'lucide-react';

const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'color', label: 'Color' },
    { value: 'range', label: 'Range' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'select', label: 'Select' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'file', label: 'File' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        input_type: 'text',
        validation_rules: [],
        config: {},
        is_active: true,
    });

    const [validationRules, setValidationRules] = useState([]);
    const [configData, setConfigData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.property.type.store'), {
            data: {
                ...data,
                validation_rules: validationRules,
                config: configData,
            }
        });
    };

    const addValidationRule = () => {
        setValidationRules([...validationRules, '']);
    };

    const updateValidationRule = (index, value) => {
        const newRules = [...validationRules];
        newRules[index] = value;
        setValidationRules(newRules);
    };

    const removeValidationRule = (index) => {
        setValidationRules(validationRules.filter((_, i) => i !== index));
    };

    const updateConfig = (key, value) => {
        setConfigData({ ...configData, [key]: value });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Property Type" />

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.property.type.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Property Type</h1>
                        <p className="text-muted-foreground">
                            Add a new property type to the system.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Define the basic properties of the property type.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name *
                                    </label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Text Input"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Slug *
                                    </label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g., text-input"
                                        className={errors.slug ? 'border-red-500' : ''}
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-red-500">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe what this property type is used for..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="input_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Input Type *
                                </label>
                                <Select
                                    value={data.input_type}
                                    onChange={(e) => setData('input_type', e.target.value)}
                                >
                                    {inputTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </Select>
                                {errors.input_type && (
                                    <p className="text-sm text-red-500">{errors.input_type}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(checked) => setData('is_active', checked)}
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Validation Rules</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Define validation rules for this property type.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            {validationRules.map((rule, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        value={rule}
                                        onChange={(e) => updateValidationRule(index, e.target.value)}
                                        placeholder="e.g., required, max:255"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeValidationRule(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addValidationRule}
                            >
                                Add Validation Rule
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Configuration</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Additional configuration for this property type.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Placeholder
                                    </label>
                                    <Input
                                        id="placeholder"
                                        value={configData.placeholder || ''}
                                        onChange={(e) => updateConfig('placeholder', e.target.value)}
                                        placeholder="Enter placeholder text..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="default" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Default Value
                                    </label>
                                    <Input
                                        id="default"
                                        value={configData.default || ''}
                                        onChange={(e) => updateConfig('default', e.target.value)}
                                        placeholder="Enter default value..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.property.type.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Creating...' : 'Create Property Type'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}