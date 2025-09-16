import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div>
                        <button className="p-2 bg-gray-500 text-gray-200 rounded-lg">Check System</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
