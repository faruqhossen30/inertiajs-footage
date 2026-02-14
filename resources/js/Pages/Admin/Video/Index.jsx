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
    return (
        <AuthenticatedLayout>
            <Head title="Videos" />
            {/* <Link href={route('video.create')} className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700 m-2">Insert Video</Link> */}

            <Button color="light" href={route('video.create')} className="my-2">
                <PlusIcon />
                Insert Video
            </Button>

            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <Table dense >
                    <TableHead className="bg-gray-50 dark:bg-slate-800">
                        <TableRow>
                            <TableHeader>
                                <span className="mx-5">S.N</span>
                            </TableHeader>
                            <TableHeader>Thumbnail</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    <span className="mx-5">{index + 1}</span>
                                </TableCell>

                                <TableCell>
                                    <img src={window.location.origin + '/server/' + item.thumbnail} alt="" className="h-10 rounded-sm" />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Badge className="capitalize">{item.status}</Badge>
                                </TableCell>
                                <TableCell className="text-zinc-500 flex space-x-1">
                                    <Link href={route('video.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                        <EyeIcon className="w-4 h-4" />
                                    </Link>

                                    <Link href={route('video.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                        <PencilIcon className="w-4 h-5" />
                                    </Link>
                                    <Link href={route('video.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-red-500">
                                        <TrashIcon className="w-4 h-4 " />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='py-5'>
                <Pagination pagination={videos} links={videos.links} />
            </div>
        </AuthenticatedLayout>
    );
}
