import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [showSelected, setShowSelected] = useState(false);
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white dark:bg-gray-900 p-3 rounded-md'>
            <h1 className='font-bold text-lg text-gray-900 dark:text-white'>Filter Jobs</h1>
            <hr className='mt-3 border-gray-300 dark:border-gray-700' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg text-gray-900 dark:text-white'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className='text-gray-900 dark:text-gray-200'>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
            <button
                className='mt-4 w-full py-2 rounded-md bg-[#A084E8] text-white font-semibold hover:bg-[#6A38C2] transition-colors'
                onClick={() => setShowSelected(true)}
                disabled={!selectedValue}
            >
                Select
            </button>
            {showSelected && selectedValue && (
                <div className='mt-3 p-2 rounded bg-[#F3F0FF] dark:bg-[#23213A] text-[#6A38C2] dark:text-[#A084E8] text-center font-medium'>
                    Selected: {selectedValue}
                </div>
            )}
        </div>
    )
}

export default FilterCard