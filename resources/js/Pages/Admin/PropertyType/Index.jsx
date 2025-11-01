import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/Components/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/table';
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from '@/Components/Dropdown';
import { MoreHorizontal, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Index({ propertyTypes }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this property type?')) {
            router.delete(route('admin.property.type.destroy', id));
        }
    };

    const handleToggleStatus = (id) => {
        router.patch(route('admin.property.type.toggle-status', id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Property Types" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Property Types</h1>
                        <p className="text-muted-foreground">
                            Manage different types of properties that can be used in templates.
                        </p>
                    </div>
                    <Link href={route('admin.property.type.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Property Type
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Property Types</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            A list of all property types in your system.
                        </p>
                    </div>
                    <div className="p-6">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Slug</TableHeader>
                                    <TableHeader>Input Type</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Description</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {propertyTypes.data.map((propertyType) => (
                                    <TableRow key={propertyType.id}>
                                        <TableCell className="font-medium">
                                            {propertyType.name}
                                        </TableCell>
                                        <TableCell>
                                            <code className="bg-muted px-2 py-1 rounded text-sm">
                                                {propertyType.slug}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Badge color="blue">
                                                {propertyType.input_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge color={propertyType.is_active ? "green" : "zinc"}>
                                                {propertyType.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {propertyType.description || '-'}
                                        </TableCell>
                                        <TableCell className="text-right flex space-x-1">
                                        <Link href="#" className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                                <EyeIcon className="w-4 h-5" />
                                            </Link>

                                            <Link href={route('admin.property.type.edit', propertyType.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                                <PencilIcon className="w-4 h-5" />
                                            </Link>

                                            {/* <Dropdown>
                                                <DropdownButton>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownButton>
                                                <DropdownMenu>
                                                    <DropdownItem as={Link} href={route('admin.property.type.show', propertyType.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownItem>
                                                    <DropdownItem as={Link} href={route('admin.property.type.edit', propertyType.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleToggleStatus(propertyType.id)}>
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
                                                    </DropdownItem>
                                                    <DropdownItem 
                                                        onClick={() => handleDelete(propertyType.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {propertyTypes.data.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No property types found.</p>
                                <Link href={route('admin.property.type.create')}>
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create First Property Type
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {propertyTypes.links && (
                    <div className="flex justify-center">
                        <nav className="flex space-x-2">
                            {propertyTypes.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm ${link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
