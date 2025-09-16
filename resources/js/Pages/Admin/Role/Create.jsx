import { Head, useForm } from '@inertiajs/react';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SubmitButton from '@/Components/Form/SubmitButton';
import { useState } from 'react';
import { Input } from '@/Components/input';
import { FlashMessage } from '@/Components/FlashMessage';

export default function Create({ auth, permissions, flash, errors }) {
    const { data, setData, post, processing } = useForm({
        name: '',
        permissionIds: []
    });

    function submit(e) {
        e.preventDefault();
        post(route('role.store'));
    }

    // Function to handle select all permissions in a group
    const handleSelectAllInGroup = (moduleName, checked) => {
        const modulePermissions = permissions[moduleName] || [];
        const currentPermissionIds = [...data.permissionIds];
        
        if (checked) {
            // Add all permissions from this module
            modulePermissions.forEach(permission => {
                if (!currentPermissionIds.includes(permission.id)) {
                    currentPermissionIds.push(permission.id);
                }
            });
        } else {
            // Remove all permissions from this module
            modulePermissions.forEach(permission => {
                const index = currentPermissionIds.indexOf(permission.id);
                if (index !== -1) {
                    currentPermissionIds.splice(index, 1);
                }
            });
        }
        
        setData('permissionIds', currentPermissionIds);
    };

    // Check if all permissions in a group are selected
    const isGroupFullySelected = (moduleName) => {
        const modulePermissions = permissions[moduleName] || [];
        return modulePermissions.every(permission => 
            data.permissionIds.includes(permission.id)
        );
    };

    // Check if some permissions in a group are selected
    const isGroupPartiallySelected = (moduleName) => {
        const modulePermissions = permissions[moduleName] || [];
        const selectedCount = modulePermissions.filter(permission => 
            data.permissionIds.includes(permission.id)
        ).length;
        
        return selectedCount > 0 && selectedCount < modulePermissions.length;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Role" />
            
            {flash?.error && <FlashMessage type="error" message={flash.error} />}
            
            <BreadcumComponent pageOne="Role" pageOneRoute="role.index" pageTwo="Create" />
            <div
                className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div
                    className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        Create New Role
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className="px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 border p-5 rounded">
                                    <Field>
                                        <Label>Role Name</Label>
                                        <Input 
                                            type="text" 
                                            name="name" 
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)} 
                                        />
                                    </Field>
                                    {errors.name && <p className="text-red-500 font-bold text-xs">{errors.name}</p>}
                                </div>
                                
                                <div className="col-span-12">
                                    <h3 className="text-lg font-medium mb-4">Permissions</h3>
                                    {errors.permissionIds && <p className="text-red-500 font-bold text-xs mb-2">{errors.permissionIds}</p>}
                                    
                                    {Object.keys(permissions).map((moduleName) => (
                                        <div key={moduleName} className="mb-6 border p-4 rounded">
                                            <div className="flex items-center mb-2">
                                                <Checkbox
                                                    checked={isGroupFullySelected(moduleName)}
                                                    indeterminate={isGroupPartiallySelected(moduleName)}
                                                    onChange={(checked) => handleSelectAllInGroup(moduleName, checked)}
                                                    color="green"
                                                />
                                                <span className="ml-2 font-medium">{moduleName}</span>
                                            </div>
                                            
                                            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {permissions[moduleName].map((permission) => (
                                                    <CheckboxField key={permission.id}>
                                                        <Checkbox
                                                            name={permission.id}
                                                            color="green"
                                                            checked={data.permissionIds.includes(permission.id)}
                                                            value={permission.id}
                                                            onChange={(checked) => {
                                                                setData('permissionIds',
                                                                    checked 
                                                                        ? [...data.permissionIds, permission.id] 
                                                                        : data.permissionIds.filter((item) => item !== permission.id)
                                                                );
                                                            }}
                                                        />
                                                        <Label>{permission.name}</Label>
                                                    </CheckboxField>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <SubmitButton processing={processing} />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
