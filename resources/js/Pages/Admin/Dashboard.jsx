import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import socket from '@/socket';
import { useEffect } from 'react';

export default function Dashboard() {
    // useEffect(() => {
    //     socket.connect();

    //     socket.on("some", (data) => {
    //         console.log('this is some event');
    //     });

    // }, []);


    function onTest() {
        // socket.emit("test", "test");
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div>
                        <button onClick={() => onTest()} className="p-2 bg-gray-500 text-gray-200 rounded-lg">Check System</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
