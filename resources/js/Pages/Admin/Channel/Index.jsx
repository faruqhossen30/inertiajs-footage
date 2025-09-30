import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import SearchFilter from '@/Components/Custom/SearchFilter';


export default function Index({ auth, channels }) {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center">
                <BreadcumComponent pageOne="channels" pageOneRoute="channel.index" />
                <Button color="light" href={route('channel.create')}>
                    <PlusIcon />
                    Add item
                </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <SearchFilter routeName={'channel.index'} />
                <Table dense >
                    <TableHead className="bg-gray-50 dark:bg-slate-800">
                        <TableRow>
                            <TableHeader>
                                <span className="mx-5">S.N</span>
                            </TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {channels.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    <span className="mx-5">{item.id}</span>
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-zinc-500 flex space-x-1">
                                    <Link href={route('channel.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                        <EyeIcon className="w-4 h-4" />
                                    </Link>

                                    <Link href={route('channel.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                        <PencilIcon className="w-4 h-5" />
                                    </Link>
                                    <Link href={route('channel.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-red-500">
                                        <TrashIcon className="w-4 h-4 " />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination pagination={channels} links={channels.links} />
            </div>



        </AuthenticatedLayout>
    );
}
