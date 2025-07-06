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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
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
                    <h1 className='font-extrabold text-2xl mb-6 text-center text-gray-900 dark:text-white tracking-tight'>Login</h1>
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
                    <div className='flex items-center justify-between my-6'>
                        <RadioGroup className="flex items-center gap-8">
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
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#A084E8] text-white font-semibold" disabled> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#A084E8] hover:bg-[#6A38C2] text-white font-semibold">Login</Button>
                    }
                    <span className='text-sm block text-center text-gray-700 dark:text-gray-300'>Don't have an account? <Link to="/signup" className='text-[#6A38C2] hover:underline'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login