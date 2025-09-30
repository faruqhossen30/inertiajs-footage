import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import SearchFilter from '@/Components/Custom/SearchFilter';


export default function Index() {
    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center">
                <BreadcumComponent pageOne="Videos" pageOneRoute="video.index" />
                <Button color="light" href={route('video.create')}>
                    <PlusIcon />
                    Add item
                </Button>
            </div>


        </AuthenticatedLayout>
    );
}
