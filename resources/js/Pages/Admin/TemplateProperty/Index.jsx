import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/Components/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/table';
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from '@/Components/Dropdown';
import { Select } from '@/Components/select';
import { Input } from '@/Components/input';
import { MoreHorizontal, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Button } from '@/Components/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ templateProperties, templates, propertyTypes, filters }) {
    const [localFilters, setLocalFilters] = useState(filters || {});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this template property?')) {
            router.delete(route('admin.template.property.destroy', id));
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        
        // Apply filters immediately
        router.get(route('admin.template.property.index'), newFilters, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(route('admin.template.property.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Template Properties" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Template Properties</h1>
                        <p className="text-muted-foreground">
                            Manage properties for your templates.
                        </p>
                    </div>
                    <Link href={route('admin.template.property.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Property
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Template</label>
                                <Select
                                    value={localFilters.template_id || ''}
                                    onChange={(e) => handleFilterChange('template_id', e.target.value)}
                                >
                                    <option value="">All templates</option>
                                    {templates.map((template) => (
                                        <option key={template.id} value={template.id.toString()}>
                                            {template.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Type</label>
                                <Select
                                    value={localFilters.type || ''}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="">All types</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type.slug} value={type.slug}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                                <Input
                                    placeholder="Search properties..."
                                    value={localFilters.search || ''}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                        </div>

                        {(localFilters.template_id || localFilters.type || localFilters.search) && (
                            <div className="mt-4">
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Template Properties</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            A list of all template properties in your system.
                        </p>
                    </div>
                    <div className="p-6">
                        <Table dense>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Template</TableHeader>
                                    <TableHeader>Key</TableHeader>
                                    <TableHeader>Value</TableHeader>
                                    <TableHeader>Type</TableHeader>
                                    <TableHeader>Sort Order</TableHeader>
                                    <TableHeader className="text-right">Actions</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {templateProperties.data.map((property) => (
                                    <TableRow key={property.id}>
                                        <TableCell className="font-medium">
                                            {property.template?.name || 'Unknown Template'}
                                        </TableCell>
                                        <TableCell>
                                            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                                                {property.key}
                                            </code>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {property.value || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge color="blue">
                                                {property.property_type?.name || property.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {property.sort_order}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dropdown>
                                                <DropdownButton>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownButton>
                                                <DropdownMenu>
                                                    <DropdownItem as={Link} href={route('admin.template.property.show', property.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownItem>
                                                    <DropdownItem as={Link} href={route('admin.template.property.edit', property.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem 
                                                        onClick={() => handleDelete(property.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {templateProperties.data.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No template properties found.</p>
                                <Link href={route('admin.template.property.create')}>
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create First Property
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {templateProperties.links && (
                    <div className="flex justify-center">
                        <nav className="flex space-x-2">
                            {templateProperties.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}