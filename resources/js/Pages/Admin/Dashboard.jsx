import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    // useEffect(() => {
    //     socket.connect();

    //     socket.on("some", (data) => {
    //         console.log('this is some event');
    //     });

    // }, []);



    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

        </AuthenticatedLayout>
    );
}
