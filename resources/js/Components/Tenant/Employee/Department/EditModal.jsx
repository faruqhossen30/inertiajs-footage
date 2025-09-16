'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SubmitButton from '@/Components/Form/SubmitButton'
import InputLabel from '@/Components/Form/InputLabel'
import Input from '@/Components/Form/Input'
import { useForm } from '@inertiajs/react'
import CancelButton from '@/Components/Form/CancelButton'

export default function EditModal({item}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: item.name,
    });
    const [open, setOpen] = useState(false)

    function submit(e) {
        e.preventDefault();
        put(route("department.update", item.id),{
            onSuccess: (res) => {
                setOpen(!open);
            },
        });
    }

    function toggleModal() {
        setOpen(!open);
    }

    return (
        <>
            <button
                onClick={() => toggleModal()}
                type="button"
                className="border p-1 rounded-md dark:border-gray-700 text-green-500" >
              <PencilIcon className="w-4 h-5" />
            </button>

            <Dialog open={open} onClose={setOpen} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex justify-center p-4 mt-10 text-center sm:items-center sm:p-0">
                        <form onSubmit={submit} className="">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="rounded-md text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <div>
                                    <InputLabel isRequired={true} labelFor="name" />
                                    <Input id="name" type="text" name="name" value={data.name} autoComplete="name"
                                        placeholder="name" onChange={(e) => setData("name", e.target.value)} />
                                    <p className="text-sm text-red-600 mt-2"> {errors.name} </p>
                                </div>

                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <SubmitButton title="Update" />
                                    {/* <CancelButton /> */}

                                </div>
                            </DialogPanel>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>

    )
}
