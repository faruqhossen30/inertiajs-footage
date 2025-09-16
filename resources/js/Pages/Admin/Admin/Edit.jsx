import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';

export default function Edit({ auth, admin, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: admin.name,
        email: admin.email,
        password: '',
        password_confirmation: '',
        role_ids: admin.roles.map(role => role.id),
    });

    const [selectedRoles, setSelectedRoles] = useState(admin.roles.map(role => role.id));

    useEffect(() => {
        setSelectedRoles(admin.roles.map(role => role.id));
    }, [admin]);

    const handleRoleChange = (roleId) => {
        const newSelectedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter(id => id !== roleId)
            : [...selectedRoles, roleId];
        
        setSelectedRoles(newSelectedRoles);
        setData('role_ids', newSelectedRoles);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.update', admin.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Admin</h2>}
        >
            <Head title="Edit Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="New Password (leave blank to keep current)" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel value="Roles" />
                                    <div className="mt-2 space-y-2">
                                        {roles.map((role) => (
                                            <label key={role.id} className="inline-flex items-center mr-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={selectedRoles.includes(role.id)}
                                                    onChange={() => handleRoleChange(role.id)}
                                                />
                                                <span className="ml-2">{role.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.role_ids} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Update Admin
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 