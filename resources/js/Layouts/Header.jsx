import React from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    EnvelopeIcon,
    FolderIcon,
    HomeIcon,
    PowerIcon,
    UserCircleIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Switcher from '@/Components/Switcher';
import { Link } from '@inertiajs/react';

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b dark:border-b-gray-700 border-gray-200 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-800 dark:bg-gray-400 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form action="#" method="GET" className="relative flex flex-1">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                    />
                    <input
                        id="search-field"
                        name="search"
                        type="search"
                        placeholder="Search..."
                        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-800 dark:text-gray-400 bg-transparent placeholder:text-gray-400  focus:ring-0 sm:text-sm"
                    />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Switcher />
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                    </button>

                    {/* Separator */}
                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="h-8 w-8 rounded-full bg-gray-50"
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-400">
                                    Tom Cook
                                </span>
                                <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                            </span>
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2.5 origin-top-right bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                                <Link href="" method="post" as="button"
                                    className="flex w-full items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                    <UserCircleIcon className="w-5" />
                                    Jamal Mia
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="" method="post" as="button"
                                    className="flex w-full items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                    <EnvelopeIcon className="h-5" />
                                    email@gmail.com
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={route('logout')} method="post" as="button"
                                    className="flex w-full items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                    <PowerIcon className="w-5" />
                                    Logout
                                </Link>
                            </MenuItem>

                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Header
