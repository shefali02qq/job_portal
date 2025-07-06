import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#F83002] font-semibold shadow'>No. 1 Career Platform</span>
                <h1 className='text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white'>Discover, Apply & <br /> <span className='text-[#A084E8]'>Achieve Your <span className="block md:inline">Dream Career</span></span></h1>
                <p className='text-gray-600 dark:text-gray-300 text-lg'>Find the best opportunities tailored for you. Start your journey with <span className='font-semibold text-[#A084E8]'>CareerHub</span> today!</p>
                <div className='flex w-full md:w-[40%] shadow-lg border border-gray-200 dark:border-gray-700 pl-3 rounded-full items-center gap-4 mx-auto bg-white dark:bg-gray-800'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection