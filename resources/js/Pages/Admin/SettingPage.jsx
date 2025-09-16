'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Field, Label, Switch } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import {
    BellIcon,
    CogIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    GlobeAltIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Invoices', href: '#' },
    { name: 'Clients', href: '#' },
    { name: 'Expenses', href: '#' },
]
const secondaryNavigation = [
    { name: 'Wesbsite', href: '#', icon: GlobeAltIcon, current: true },
    { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
    { name: 'Notifications', href: '#', icon: BellIcon, current: false },
    { name: 'Plan', href: '#', icon: CubeIcon, current: false },
    { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Team members', href: '#', icon: UsersIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SettingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)

    return (
        <AuthenticatedLayout>

            <div className="mx-auto lg:flex border dark:border-gray-700 bg-white dark:bg-slate-900">
                <h1 className="sr-only">General Settings</h1>
                <aside className="flex overflow-x-autolg:block lg:w-64 lg:flex-none border-r">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0 w-full">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col w-full">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-100 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600',
                                            'group flex gap-x-3 rounded-md py-2 pl-5 pr-3 text-sm font-semibold leading-6',
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0',
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className="">
                    <div className="flex space-x-1 items-center py-2 shadow px-5">
                        <CogIcon className="h-6 text-indigo-600" />
                        <span className="text-indigo-600 font-semibold leading-6">Lorem ipsum dolor</span>
                    </div>
                    <div className='px-5'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ad unde necessitatibus neque eius suscipit debitis molestias non excepturi veritatis quae sapiente, iure nesciunt sed fugiat dolorem. Corporis, officia praesentium?</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
