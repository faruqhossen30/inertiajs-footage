import React, { useState } from 'react'
import { Button } from '@/Components/button';
import { Label } from '../fieldset';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Input } from '@/Components/input';

const VideoFootageComponant = ({ setData, errors }) => {
    const [footages, setFootages] = useState([]);

    const addFootage = () => {
        const newFootage = [...footages, { keyword: '' }];
        setFootages(newFootage);
        setData('footages', newFootage);
    };

    const removeFootage = (index) => {
        if (footages.length > 1) {
            const newFootage = footages.filter((_, i) => i !== index);
            setFootages(newFootage);
            setData('footages', newFootage);
        }
    };

    const updateFootage = (index, field, value) => {
        const newFootage = [...footages];
        newFootage[index][field] = value;
        setFootages(newFootage);
        setData('footages', newFootage);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <label htmlFor="titlte" className="font-bold"> Footages </label>
                <Button
                    type="button"
                    color="light"
                    onClick={addFootage}
                    className="text-sm"
                >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Footage
                </Button>
            </div>
            <hr />

            {footages.map((footage, index) => (
                <div key={index} className="rounded-lg mb-3 flex w-full items-center">
                    <div className="w-[30%]  ">
                       <span> Footage {index + 1}</span>
                    </div>

                    <div className="flex items-center gap-2 w-full">
                        <div className="w-full">
                            <Input
                                type="text"
                                placeholder="Enter option keyword"
                                value={footage.keyword}
                                onChange={(e) => updateFootage(index, 'keyword', e.target.value)}
                            />
                            {errors[`footage.${index}.keyword`] && (
                                <p className="text-sm text-red-600 mt-1">{errors[`footage.${index}.keyword`]}</p>
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFootage(index)}
                            color='red'
                        >
                            <TrashIcon/>
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default VideoFootageComponant