import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { Badge } from '@/Components/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function Show({ templateProperty }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this template property?')) {
            router.delete(route('admin.template.property.destroy', templateProperty.id));
        }
    };

    const renderValueDisplay = () => {
        if (!templateProperty.property_type) {
            return <span className="text-gray-500">{templateProperty.value || '-'}</span>;
        }

        switch (templateProperty.property_type.input_type) {
            case 'color':
                return (
                    <div className="flex items-center space-x-2">
                        <div 
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: templateProperty.value || '#000000' }}
                        />
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {templateProperty.value || '#000000'}
                        </code>
                    </div>
                );
            case 'checkbox':
                const isChecked = templateProperty.value === 'true' || templateProperty.value === true;
                return (
                    <Badge color={isChecked ? "green" : "zinc"}>
                        {isChecked ? 'Yes' : 'No'}
                    </Badge>
                );
            case 'json':
                try {
                    const parsed = JSON.parse(templateProperty.value);
                    return (
                        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto">
                            {JSON.stringify(parsed, null, 2)}
                        </pre>
                    );
                } catch {
                    return <span className="text-gray-500">{templateProperty.value || '-'}</span>;
                }
            default:
                return <span>{templateProperty.value || '-'}</span>;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${templateProperty.key} - Template Property`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={route('admin.template.property.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{templateProperty.key}</h1>
                            <p className="text-muted-foreground">
                                Template property details and configuration
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={route('admin.template.property.edit', templateProperty.id)}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Property Information</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Core details about this template property
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Template</label>
                                <p className="text-lg font-semibold">
                                    {templateProperty.template?.name || 'Unknown Template'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Key</label>
                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                                    {templateProperty.key}
                                </code>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Type</label>
                                <div className="mt-1">
                                    <Badge color="blue">
                                        {templateProperty.property_type?.name || templateProperty.type}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Sort Order</label>
                                <p className="mt-1">{templateProperty.sort_order}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                                <p className="mt-1">
                                    {new Date(templateProperty.created_at).toLocaleDateString()} at{' '}
                                    {new Date(templateProperty.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                                <p className="mt-1">
                                    {new Date(templateProperty.updated_at).toLocaleDateString()} at{' '}
                                    {new Date(templateProperty.updated_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Property Value</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Current value and type information
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Value</label>
                                <div className="mt-2">
                                    {renderValueDisplay()}
                                </div>
                            </div>
                            
                            {templateProperty.property_type && (
                                <>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Input Type</label>
                                        <Badge color="zinc" className="mt-1">
                                            {templateProperty.property_type.input_type}
                                        </Badge>
                                    </div>
                                    
                                    {templateProperty.property_type.description && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type Description</label>
                                            <p className="mt-1 text-sm">{templateProperty.property_type.description}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {templateProperty.property_type && (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Type Configuration</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Configuration settings for this property type
                            </p>
                        </div>
                        <div className="p-6">
                            {templateProperty.property_type.config && Object.keys(templateProperty.property_type.config).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(templateProperty.property_type.config).map(([key, value]) => (
                                        <div key={key}>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                                {key.replace('_', ' ')}
                                            </label>
                                            <p className="mt-1">
                                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No configuration set for this property type</p>
                            )}
                        </div>
                    </div>
                )}

                {templateProperty.property_type?.validation_rules && templateProperty.property_type.validation_rules.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Validation Rules</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Validation rules applied to this property type
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-2">
                                {templateProperty.property_type.validation_rules.map((rule, index) => (
                                    <Badge key={index} color="zinc" className="mr-2">
                                        {rule}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}