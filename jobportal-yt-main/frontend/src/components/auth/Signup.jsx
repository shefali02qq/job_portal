import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
        inclusiveStatus: "None"
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("inclusiveStatus", input.inclusiveStatus);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gray-950 dark:bg-gray-950">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-xl p-8 my-16 bg-white dark:bg-[#181829] shadow-2xl'>
                    <h1 className='font-extrabold text-2xl mb-6 text-center text-gray-900 dark:text-white tracking-tight'>Sign Up</h1>
                    <div className='my-4'>
                        <Label className='text-gray-900 dark:text-gray-200'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="patel"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-[#A084E8] focus:border-[#A084E8]"
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='text-gray-900 dark:text-gray-200'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-[#A084E8] focus:border-[#A084E8]"
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='text-gray-900 dark:text-gray-200'>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-[#A084E8] focus:border-[#A084E8]"
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='text-gray-900 dark:text-gray-200'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Your password"
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-[#A084E8] focus:border-[#A084E8]"
                        />
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between my-6 gap-4'>
                        <RadioGroup className="flex items-center gap-8 w-full md:w-auto">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-[#A084E8]"
                                    id="r1"
                                />
                                <Label htmlFor="r1" className='text-gray-900 dark:text-gray-200'>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-[#A084E8]"
                                    id="r2"
                                />
                                <Label htmlFor="r2" className='text-gray-900 dark:text-gray-200'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2 w-full md:w-auto'>
                            <Label className='text-gray-900 dark:text-gray-200'>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 file:bg-[#A084E8] file:text-white file:rounded file:px-3 file:py-1"
                            />
                        </div>
                    </div>
                    {/* Inclusive Status Dropdown */}
                    <div className='my-4'>
                        <Label className='text-gray-900 dark:text-gray-200'>Inclusive Status</Label>
                        <select
                            name="inclusiveStatus"
                            value={input.inclusiveStatus}
                            onChange={changeEventHandler}
                            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-[#A084E8] focus:border-[#A084E8]"
                        >
                            <option value="None">None</option>
                            <option value="PWD">PWD</option>
                            <option value="WomenReturnee">Women Returnee</option>
                            <option value="LGBTQ+">LGBTQ+</option>
                            <option value="EWS">EWS</option>
                        </select>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#A084E8] text-white font-semibold" disabled> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#A084E8] hover:bg-[#6A38C2] text-white font-semibold">Signup</Button>
                    }
                    <span className='text-sm block text-center text-gray-700 dark:text-gray-300'>Already have an account? <Link to="/login" className='text-[#6A38C2] hover:underline'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup