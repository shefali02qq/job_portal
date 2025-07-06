import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl shadow-xl bg-[#F3F0FF] dark:bg-[#23213A] border border-[#A084E8] dark:border-[#A084E8] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-2xl'>
            <div>
                <h1 className='font-medium text-lg text-gray-900 dark:text-white'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-gray-900 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-700 dark:text-gray-200'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 dark:text-blue-400 font-bold bg-blue-100 dark:bg-blue-900'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] dark:text-orange-400 font-bold bg-orange-100 dark:bg-orange-900'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-900'} variant="ghost">{job?.salary}LPA</Badge>
                {Array.isArray(job?.inclusiveTags) && job.inclusiveTags.length > 0 && job.inclusiveTags.map(tag => (
                    <Badge key={tag} className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold' variant="ghost">{tag}</Badge>
                ))}
            </div>

        </div>
    )
}

export default LatestJobCards