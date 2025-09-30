
import { Head, useForm } from '@inertiajs/react';
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ThumbnailInput from '@/Components/ThumbnailInput';
import InputLabel from '@/Components/InputLabel';
import { Input } from '@/Components/input';
import { Button } from '@/Components/button';


export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        key: '',
        email: ''
    });

    function submit(e) {
        e.preventDefault()
        console.log(data);
        post(route('api-key.store'));
        
    }

    return (
        <AuthenticatedLayout>
            <BreadcumComponent pageOne="API KEY" pageOneRoute="api-key.index" />

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        API Key Create
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name"> Name </InputLabel>
                                <Input id="name" type="text" name="name" value={data.name} autoComplete="name" placeholder="name" onChange={(e) => setData('name', e.target.value)} />
                                <p className="text-sm text-red-600 mt-2">{errors.name}</p>
                            </div>
                            <div>
                                <InputLabel htmlFor="key"> API KEY </InputLabel>
                                <Input id="key" type="text" name="key" value={data.key} autoComplete="key" placeholder="key" onChange={(e) => setData('key', e.target.value)} />
                                <p className="text-sm text-red-600 mt-2">{errors.key}</p>
                            </div>

                            <div>
                                <InputLabel htmlFor="email"> API email </InputLabel>
                                <Input id="email" type="text" name="email" value={data.email} autoComplete="email" placeholder="email" onChange={(e) => setData('email', e.target.value)} />
                                <p className="text-sm text-red-600 mt-2">{errors.email}</p>
                            </div>


                            <Button type="submit" disabled={processing} >Save </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
