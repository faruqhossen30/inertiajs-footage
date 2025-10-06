import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { ArrowLeft, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Show({ propertyType }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this property type?')) {
            router.delete(route('admin.property-type.destroy', propertyType.id));
        }
    };

    const handleToggleStatus = () => {
        router.patch(route('admin.property-type.toggle-status', propertyType.id));
    };

    return (
        <AdminLayout>
            <Head title={propertyType.name} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={route('admin.property-type.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{propertyType.name}</h1>
                            <p className="text-muted-foreground">
                                Property type details and configuration
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={route('admin.property-type.edit', propertyType.id)}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleToggleStatus}
                        >
                            {propertyType.is_active ? (
                                <>
                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                    Deactivate
                                </>
                            ) : (
                                <>
                                    <ToggleRight className="mr-2 h-4 w-4" />
                                    Activate
                                </>
                            )}
                        </Button>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Core details about this property type
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="text-lg font-semibold">{propertyType.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Slug</label>
                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                    {propertyType.slug}
                                </code>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Input Type</label>
                                <Badge variant="outline" className="mt-1">
                                    {propertyType.input_type}
                                </Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <Badge variant={propertyType.is_active ? "default" : "secondary"}>
                                        {propertyType.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            {propertyType.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1">{propertyType.description}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>
                                Additional configuration settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {propertyType.config && Object.keys(propertyType.config).length > 0 ? (
                                Object.entries(propertyType.config).map(([key, value]) => (
                                    <div key={key}>
                                        <label className="text-sm font-medium text-muted-foreground capitalize">
                                            {key.replace('_', ' ')}
                                        </label>
                                        <p className="mt-1">
                                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No configuration set</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Validation Rules</CardTitle>
                        <CardDescription>
                            Validation rules applied to this property type
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {propertyType.validation_rules && propertyType.validation_rules.length > 0 ? (
                            <div className="space-y-2">
                                {propertyType.validation_rules.map((rule, index) => (
                                    <Badge key={index} variant="secondary" className="mr-2">
                                        {rule}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No validation rules set</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Usage Statistics</CardTitle>
                        <CardDescription>
                            How this property type is being used
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {propertyType.template_properties?.length || 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Template Properties
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {propertyType.template_properties?.filter(p => p.template).length || 0}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Active Templates
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {new Date(propertyType.created_at).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Created Date
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
