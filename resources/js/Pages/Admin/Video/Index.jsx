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
            
        </AuthenticatedLayout>
    );
}
