import { Head, Link } from '@inertiajs/react';
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { Badge } from '@/Components/badge';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FlashMessage } from '@/Components/FlashMessage';

export default function Show({ role, flash }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Role: ${role.name}`} />
            
            {flash?.error && <FlashMessage type="error" message={flash.error} />}
            
            <div className="flex justify-between items-center mb-4">
                <BreadcumComponent pageOne="Role" pageOneRoute="role.index" pageTwo={role.name} />
                <div className="flex space-x-2">
                    <Button color="light" href={route('role.index')}>
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Back to Roles
                    </Button>
                    <Button color="light" href={route('role.edit', role.id)}>
                        <PencilIcon className="w-5 h-5 mr-1" />
                        Edit Role
                    </Button>
                </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="bg-gray-100 border-b py-3 px-4 md:py-4 md:px-5 dark:bg-slate-800 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Role Details: {role.name}
                    </h2>
                </div>
                
                <div className="p-4 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border p-4 rounded">
                            <h3 className="text-lg font-medium mb-2">Role Information</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium">Name:</span> {role.name}
                                </div>
                                <div>
                                    <span className="font-medium">Created:</span> {new Date(role.created_at).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="font-medium">Last Updated:</span> {new Date(role.updated_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        
                        <div className="border p-4 rounded">
                            <h3 className="text-lg font-medium mb-2">Permissions</h3>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions && role.permissions.length > 0 ? (
                                    role.permissions.map(permission => (
                                        <Badge key={permission.id} color="green">
                                            {permission.name}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No permissions assigned to this role.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 