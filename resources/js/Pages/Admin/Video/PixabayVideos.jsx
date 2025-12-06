
import { Head, router, useForm } from '@inertiajs/react';
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/Components/button';

export default function PizabayVideos({ items = [], existIds = [] }) {
    console.log(existIds);
    
    const params = route().params;
    const { data, setData, post, processing, errors, reset } = useForm({
        videos: [],
    });

    function submit(e) {
        e.preventDefault()
        console.log(data);

        post(route('video.pixabay.store'));
    }


    return <AuthenticatedLayout>
        <div className="flex items-center justify-between py-3 space-x-5">
            <div className="flex items-center flex-1  px-3 border bg-white dark:border-gray-700 rounded-md">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                <input
                    onChange={(e) => {
                        return router.get(route('video.create', params),
                            {
                                search: e.target.value
                            },
                            {
                                preserveState: true,
                                replace: true
                            }
                        )
                    }}
                    defaultValue={params.search && params.search}
                    type="text" name="search" className="py-2 block w-full dark:bg-transparent border-gray-200 dark:border-gray-700 rounded-lg text-sm border-none focus:ring-0" placeholder="Search" />
            </div>
            <div className="space-x-5 flex items-center">
                <select name="show"
                    onChange={(e) => {
                        return router.get(route('video.create', params),
                            {
                                provider: e.target.value
                            },
                            {
                                preserveState: true,
                                replace: true
                            }
                        )
                    }}
                    defaultValue={params.provider && params.provider}
                    className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <option value="all">All</option>
                    <option value="pixabay">Pizabay</option>
                    <option value="freepik">Freepik</option>
                    <option value="storyblocks">Story Blocks</option>
                </select>
                <select name="show"
                    onChange={(e) => {
                        return router.get(route('video.create', params),
                            {
                                show: e.target.value
                            },
                            {
                                preserveState: true,
                                replace: true
                            }
                        )
                    }}
                    className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>

        {processing && <div>
            <p>processing</p>
        </div>}

        <form onSubmit={submit}>
            <div className="flex items-center gap-2 mb-3">
                <Button size="sm"
                    onClick={() => setData('videos', items.map(i => (
                        {
                            id: i.id,
                            thumbnail: i.videos.medium?.thumbnail,
                            url: i.videos.medium?.url,
                            tags: i.tags,
                            width: i.videos.medium?.width,
                            height: i.videos.medium?.height,
                            size: i.videos.medium?.size,
                            duration: i.duration
                        }
                    )))}
                    disabled={items.length > 0 && data.videos.length === items.length}
                >Select All</Button>
                <Button size="sm" variant="secondary"
                    onClick={() => setData('videos', [])}
                    disabled={data.videos.length === 0}
                >Unselect All</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`relative flex items-center space-x-3 rounded-lg border ${existIds.includes(item.id) ? 'border-green-700 shadow-gray-700' : 'dark:border-gray-700 border-gray-300'}  bg-white dark:bg-gray-800 p-3 shadow-sm  hover:border-gray-400`}
                    >
                        <div className="flex h-6 items-center">
                            <input
                                id={`links-${index}`}
                                name=""
                                type="checkbox"
                                aria-describedby="links-description"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                checked={data.videos.some(i => i.id === item.id)}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    if (checked) {
                                        // Add selected item (id, previewURL) without duplicates
                                        if (!data.videos.some(i => i.id === item.id)) {
                                            setData('videos', [...data.videos,
                                            {
                                                id: item.id,
                                                thumbnail: item.videos.medium?.thumbnail,
                                                url: item.videos.medium?.url,
                                                tags: item.tags,
                                                width: item.videos.medium?.width,
                                                height: item.videos.medium?.height,
                                                size: item.videos.medium?.size,
                                                duration: item.duration
                                            }
                                            ]);
                                        }
                                    } else {
                                        // Remove item when unchecked
                                        setData('videos', data.videos.filter(i => i.id !== item.id));
                                    }
                                }}
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <img alt="" src={item.videos.medium?.thumbnail} className="h-16 rounded-md" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="focus:outline-none">
                                {/* Ensure overlay doesn't block interactions like checkbox clicks */}
                                <span aria-hidden="true" className="absolute inset-0 pointer-events-none" />
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-400">Tags : {item.tags}</p>
                                <div className="truncate text-sm text-gray-800 dark:text-gray-400">
                                    <span>Duration: {item.duration}s </span>
                                    <span>Size: {(item.videos.medium?.size / 1024 / 1024).toFixed(2)} MB </span>
                                    <span>Width x Height: {item.videos.medium?.width} x {item.videos.medium?.height} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="py-5">
                <Button type="submit" >Save</Button>
            </div>
        </form>

    </AuthenticatedLayout>
}
