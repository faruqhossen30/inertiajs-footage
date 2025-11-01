import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { EyeIcon, ListBulletIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import SearchFilter from '@/Components/Custom/SearchFilter';
import Pagination from '@/Components/Pagination';
import { Badge } from '@/Components/badge';

export default function Index({ videos }) {
    const handleDelete = (id) => {
        if (confirm('Delete this video?')) {
            router.delete(route('video.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Videos" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Videos</h1>
                    <Link href={route('video.create')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                    <SearchFilter routeName={'video.index'} />
                    <Table dense >
                        <TableHead className="bg-gray-50 dark:bg-slate-800">
                            <TableRow>
                                <TableHeader>
                                    <span className="mx-5">S.N</span>
                                </TableHeader>
                                <TableHeader>Title</TableHeader>
                                <TableHeader>Template</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Action</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videos.data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                    <span className="mx-5">{index +1}</span>
                                    </TableCell>
                                    <TableCell>{item.title ?? 'N/A'}</TableCell>
                                    <TableCell>{item.video_templates_count ?? 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge className="capitalize">{item.status ?? 'N/A'}</Badge>
                                    </TableCell>
                                    <TableCell className="text-zinc-500 flex space-x-1">
                                        <Link href={route('video.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                            <EyeIcon className="w-4 h-4" />
                                        </Link>

                                        <Link href={route('video.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                            <PencilIcon className="w-4 h-5" />
                                        </Link>
                                        <Link  onClick={(e) => !confirm("Are you sure?") && e.preventDefault()} href={route('video.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-red-500">
                                            <TrashIcon className="w-4 h-4 " />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination pagination={videos} links={videos.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
