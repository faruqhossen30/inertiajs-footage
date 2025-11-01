
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
import ThumbnailInput from '@/Components/ThumbnailInput';


export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        file: null,
        thumbnail: null,
        status: true,
    });

    function submit(e) {
        e.preventDefault()
        post(route('template.store'), {
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <BreadcumComponent pageOne="Templates" pageOneRoute="template.index" />

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        Template Create
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <Fieldset>
                                <FieldGroup>
                                    <Field>
                                        <Label>Template Name</Label>
                                        <Input 
                                            name="name" 
                                            onChange={(e) => setData('name', e.target.value)} 
                                            value={data.name} 
                                        />
                                        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                                    </Field>
                                    
                                    <Field>
                                        <Label>Template File (Video)</Label>
                                        <Input 
                                            name="file" 
                                            type="file"
                                            onChange={(e) => setData('file', e.target.files[0])} 
                                        />
                                        <Description>Upload your video template file (MP4, AVI, MOV, etc.)</Description>
                                        {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file}</p>}
                                    </Field>
                                    
                                    <Field>
                                        <Label>Description</Label>
                                        <Textarea 
                                            name="description" 
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <Description>Add a description for your template.</Description>
                                        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                                    </Field>

                                    <Field className="max-w-sm pb-5">
                                        <Label>Thumbnail</Label>
                                        <ThumbnailInput 
                                            name="thumbnail" 
                                            setData={setData} 
                                            errors={errors} 
                                            placeholder="Upload Thumbnail" 
                                        />
                                    </Field>
                                    
                                    <Field>
                                        <Label>Status</Label>
                                        <Select 
                                            name="status" 
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value === 'true')}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </Select>
                                        {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                                    </Field>
                                </FieldGroup>
                            </Fieldset>

                            <Button type="submit" color="primary" disabled={processing}>
                                <PlusIcon />
                                Create Template
                            </Button>
                        </form>
                    </div>
                </div>
            </div>





        </AuthenticatedLayout>
    );
}
