import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

export default function Edit({ propertyType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: propertyType.name || '',
        slug: propertyType.slug || '',
        description: propertyType.description || '',
        input_type: propertyType.input_type || 'text',
        validation_rules: propertyType.validation_rules || [],
        config: propertyType.config || {},
        is_active: propertyType.is_active ?? true,
    });

    const [validationRules, setValidationRules] = useState(propertyType.validation_rules || []);
    const [configData, setConfigData] = useState(propertyType.config || {});

    useEffect(() => {
        setValidationRules(propertyType.validation_rules || []);
        setConfigData(propertyType.config || {});
    }, [propertyType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.property-type.update', propertyType.id), {
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
            <Head title={`Edit ${propertyType.name}`} />

            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.property-type.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Property Type</h1>
                        <p className="text-muted-foreground">
                            Update the property type: {propertyType.name}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Define the basic properties of the property type.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
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
                                    <Label htmlFor="slug">Slug *</Label>
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
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe what this property type is used for..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="input_type">Input Type *</Label>
                                <Select
                                    value={data.input_type}
                                    onValueChange={(value) => setData('input_type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select input type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {inputTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.input_type && (
                                    <p className="text-sm text-red-500">{errors.input_type}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Validation Rules</CardTitle>
                            <CardDescription>
                                Define validation rules for this property type.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>
                                Additional configuration for this property type.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="placeholder">Placeholder</Label>
                                    <Input
                                        id="placeholder"
                                        value={configData.placeholder || ''}
                                        onChange={(e) => updateConfig('placeholder', e.target.value)}
                                        placeholder="Enter placeholder text..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="default">Default Value</Label>
                                    <Input
                                        id="default"
                                        value={configData.default || ''}
                                        onChange={(e) => updateConfig('default', e.target.value)}
                                        placeholder="Enter default value..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end space-x-4">
                        <Link href={route('admin.property-type.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Updating...' : 'Update Property Type'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
