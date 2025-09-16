import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import SearchFilter from '@/Components/Custom/SearchFilter';
import { Badge } from '@/Components/badge';
import { FlashMessage } from '@/Components/FlashMessage';


export default function Index({ auth, roles, flash }) {
    return (
        <AuthenticatedLayout>
            <Head title="Roles" />
            
            {flash?.success && <FlashMessage type="success" message={flash.success} />}
            {flash?.error && <FlashMessage type="error" message={flash.error} />}
            
            <div className="flex justify-between items-center">
                <BreadcumComponent pageOne="Roles" pageOneRoute="role.index" />
                <Button color="light" href={route('role.create')}>
                    <PlusIcon className="w-5 h-5 mr-1" />
                    Add Role
                </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <Table className="px-3" dense grid >
                    <TableHead className="bg-gray-50 dark:bg-slate-800 ">
                        <TableRow>
                            <TableHeader>S.N</TableHeader>
                            <TableHeader>Role</TableHeader>
                            <TableHeader>Permissions</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.data.map((item, index) => {
                            return <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="space-x-2 whitespace-nowrap">
                                    {item.permissions && item.permissions.map((permission) => {
                                        return <Badge color="green" key={permission.id}>{permission.name}</Badge>
                                    })}
                                </TableCell>
                                <TableCell className="text-zinc-500 flex space-x-1">
                                    <Link href={route('role.show', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                        <EyeIcon className="w-4 h-4" />
                                    </Link>

                                    <Link href={route('role.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                        <PencilIcon className="w-4 h-5" />
                                    </Link>
                                    <Link href={route('role.destroy', item.id)} method="delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-red-500">
                                        <TrashIcon className="w-4 h-4 " />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                <Pagination pagination={roles} links={roles.links} />
            </div>
        </AuthenticatedLayout>
    );
}
