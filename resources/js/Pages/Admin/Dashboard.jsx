import DashbardCard from '@/Components/Dashboard/DashbardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlayCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { FlashMessage } from '@/Components/FlashMessage';
import React from 'react';

export default function Dashboard({ flash,videos }) {

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <DashbardCard title={videos.total_done} subtitle="Tatal Videos" icon={<PlayCircleIcon className="w-6 h-6 text-white" />} />
                <Link onClick={(e) => !confirm("Are you sure?") && e.preventDefault()} href={route('video.enqueue')} method="post" className="text-start">
                    <DashbardCard
                        title="Download Queue"
                        subtitle={`${videos.total_list} Video is listed for download ${videos.total_run ? videos.total_run + 'Video is downloading ...' : ''}`}
                        icon={<ArrowDownTrayIcon className="w-6 h-6 text-white" />}                      
                        preserveScroll
                    />
                </Link>
            </div>

            {flash?.success && <FlashMessage type="success" message={flash.success} />}
            {flash?.error && <FlashMessage type="error" message={flash.error} />}

        </AuthenticatedLayout>
    );
}
