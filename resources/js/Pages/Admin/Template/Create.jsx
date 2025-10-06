
import { Head, useForm } from '@inertiajs/react';
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/button'


export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        status: 1,
    });

    function submit(e) {
        e.preventDefault()
        post(route('template.store'));
    }

    return (
        <AuthenticatedLayout>
            <BreadcumComponent pageOne="Categories" pageOneRoute="category.index" />

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        Category Create
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <Fieldset>
                                <FieldGroup>
                                    <Field>
                                        <Label>Template Name</Label>
                                        <Input name="name" onChange={(e) => setData('name', e.target.value)} value={data.name} />
                                    </Field>
                                    <Field>
                                        <Label>Template File</Label>
                                        <Input name="name" type="file" />
                                    </Field>
                                    <Field>
                                        <Label>Description</Label>
                                        <Textarea name="description" />
                                        <Description>If you have a tiger, we'd like to know about it.</Description>
                                    </Field>
                                </FieldGroup>
                            </Fieldset>

                            <Button type="submit" color="primary" disabled={processing}>
                                <PlusIcon />
                                Add item
                            </Button>
                        </form>
                    </div>
                </div>
            </div>





        </AuthenticatedLayout>
    );
}
