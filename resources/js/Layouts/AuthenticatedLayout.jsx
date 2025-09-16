'use client'
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000}  />
            <div>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="lg:pl-72">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="p-5 bg-gray-100 dark:bg-slate-900 min-h-screen">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
