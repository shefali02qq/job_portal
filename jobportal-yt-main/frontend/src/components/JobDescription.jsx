import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 bg-white dark:bg-[#181829] p-8 rounded-xl shadow-xl'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-900 dark:text-white'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 dark:text-blue-400 font-bold bg-blue-100 dark:bg-blue-900'} variant="ghost">{singleJob?.position || singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] dark:text-orange-400 font-bold bg-orange-100 dark:bg-orange-900'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-900'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-2 text-lg font-semibold shadow ${isApplied ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-[#A084E8] hover:bg-[#6A38C2] text-white'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 dark:border-b-gray-700 font-semibold py-4 text-gray-900 dark:text-white mt-6'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Role: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Location: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Description: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Experience: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Salary: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Total Applicants: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1 text-gray-900 dark:text-white'>Posted Date: <span className='pl-4 font-normal text-gray-800 dark:text-gray-300'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription