import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    AdjustmentsHorizontalIcon,
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    KeyIcon,
    UserGroupIcon,
    UsersIcon,
    VideoCameraIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const navigation = [
    { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: true },
    { name: 'Category', href: route('category.index'), icon: FolderIcon, current: false },
    { name: 'SubCategory', href: route('sub-category.index'), icon: FolderIcon, current: false },
    { name: 'API KEY', href: route('api-key.index'), icon: KeyIcon, current: false },
    { name: 'Video', href: route('video.index'), icon: VideoCameraIcon, current: false },
];

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Company"
                                    src=""
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-800 dark:text-gray-400 hover:bg-gray-50 hover:text-indigo-600',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
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
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <a
                                            href="#"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-400 hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <Cog6ToothIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                            />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col dark:bg-gray-800">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r dark:border-gray-700 border-gray-200 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                        <span className="px-2 font-extrabold text-lg">Dashboard</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            {!item.children ?
                                                (<Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-100 dark:bg-slate-900'
                                                            : 'text-gray-800 dark:text-gray-400 dark:hover:bg-slate-900 hover:bg-gray-100 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.current ? 'text-indigo-600 dark:text-gray-400' : 'text-gray-400',
                                                            'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </Link>) :
                                                <Disclosure as="div">
                                                    <DisclosureButton
                                                        className={classNames(
                                                            item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                            'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                                                        )}
                                                    >
                                                        <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-gray-400" />
                                                        {item.name}
                                                        <ChevronRightIcon
                                                            aria-hidden="true"
                                                            className="ml-auto h-5 w-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                                                        />
                                                    </DisclosureButton>
                                                    <DisclosurePanel as="ul" className="mt-1 px-2">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name} >
                                                                {/* 44px */}
                                                                <Link
                                                                    // as="a"
                                                                    href={subItem.href}
                                                                    className={classNames(
                                                                        subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                                        'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700',
                                                                    )}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </DisclosurePanel>
                                                </Disclosure>

                                            }

                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className="mt-auto">
                                <Link
                                    href={route('settings')}
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-800 dark:text-gray-400 hover:bg-gray-50 hover:text-indigo-600"
                                >
                                    <Cog6ToothIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                    />
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar
