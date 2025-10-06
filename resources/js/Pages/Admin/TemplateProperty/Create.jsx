import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { Input } from '@/Components/input';
import { Textarea } from '@/Components/textarea';
import { Select } from '@/Components/select';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create({ templates, propertyTypes, template_id }) {
    const { data, setData, post, processing, errors } = useForm({
        template_id: template_id || '',
        key: '',
        value: '',
        type: '',
        sort_order: 0,
    });

    const [selectedPropertyType, setSelectedPropertyType] = useState(null);

    const handlePropertyTypeChange = (typeSlug) => {
        const propertyType = propertyTypes.find(pt => pt.slug === typeSlug);
        setSelectedPropertyType(propertyType);
        setData('type', typeSlug);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.template.property.store'));
    };

    const renderValueInput = () => {
        if (!selectedPropertyType) {
            return (
                <Input
                    value={data.value}
                    onChange={(e) => setData('value', e.target.value)}
                    placeholder="Select a property type first"
                    disabled
                />
            );
        }

        switch (selectedPropertyType.input_type) {
            case 'textarea':
                return (
                    <Textarea
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                        placeholder={selectedPropertyType.config?.placeholder || 'Enter value...'}
                        rows={4}
                    />
                );
            case 'color':
                return (
                    <div className="flex items-center space-x-2">
                        <Input
                            type="color"
                            value={data.value || '#000000'}
                            onChange={(e) => setData('value', e.target.value)}
                            className="w-20 h-10"
                        />
                        <Input
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                        />
                    </div>
                );
            case 'range':
                const min = selectedPropertyType.config?.min || 0;
                const max = selectedPropertyType.config?.max || 100;
                return (
                    <div className="space-y-2">
                        <Input
                            type="range"
                            min={min}
                            max={max}
                            value={data.value || min}
                            onChange={(e) => setData('value', e.target.value)}
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{min}</span>
                            <span className="font-medium">{data.value || min}</span>
                            <span>{max}</span>
                        </div>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={data.value === 'true' || data.value === true}
                            onChange={(e) => setData('value', e.target.checked ? 'true' : 'false')}
                            className="rounded"
                        />
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {selectedPropertyType.config?.true_label || 'Yes'}
                        </label>
                    </div>
                );
            case 'select':
                const options = selectedPropertyType.config?.options || [];
                return (
                    <Select
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                    >
                        <option value="">{selectedPropertyType.config?.placeholder || 'Select an option'}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value || option}>
                                {option.label || option}
                            </option>
                        ))}
                    </Select>
                );
            default:
                return (
                    <Input
                        type={selectedPropertyType.input_type}
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                        placeholder={selectedPropertyType.config?.placeholder || 'Enter value...'}
                    />
                );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Template Property" />

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.template.property.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Template Property</h1>
                        <p className="text-muted-foreground">
                            Add a new property to a template.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Property Information</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Define the property details and configuration.
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="template_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Template *
                                    </label>
                                    <Select
                                        value={data.template_id}
                                        onChange={(e) => setData('template_id', e.target.value)}
                                    >
                                        <option value="">Select a template</option>
                                        {templates.map((template) => (
                                            <option key={template.id} value={template.id.toString()}>
                                                {template.name}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.template_id && (
                                        <p className="text-sm text-red-500">{errors.template_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Property Key *
                                    </label>
                                    <Input
                                        id="key"
                                        value={data.key}
                                        onChange={(e) => setData('key', e.target.value)}
                                        placeholder="e.g., background_color"
                                        className={errors.key ? 'border-red-500' : ''}
                                    />
                                    {errors.key && (
                                        <p className="text-sm text-red-500">{errors.key}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Property Type *
                                </label>
                                <Select
                                    value={data.type}
                                    onChange={(e) => handlePropertyTypeChange(e.target.value)}
                                >
                                    <option value="">Select property type</option>
                                    {propertyTypes.map((propertyType) => (
                                        <option key={propertyType.slug} value={propertyType.slug}>
                                            {propertyType.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-red-500">{errors.type}</p>
                                )}
                                {selectedPropertyType && (
                                    <p className="text-sm text-gray-500">
                                        {selectedPropertyType.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Value
                                </label>
                                {renderValueInput()}
                                {errors.value && (
                                    <p className="text-sm text-red-500">{errors.value}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Sort Order
                                </label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.template.property.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Creating...' : 'Create Property'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}