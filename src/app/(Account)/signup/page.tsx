'use client'

import { Loader } from '@/components';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


function SignUp() {


    const router = useRouter()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSignup(e: FormEvent) {
        setLoading(true)
        e.preventDefault()
        try {

            const response = await fetch('/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            Cookies.set('user_email', userData.email)
            router.push('/confirmemail')
            // setLoading(false)
            // setIsRegistered(true)
            // console.log(data)
        }
        catch (err: any) {
            toast.error(err.message, {
                duration: 4000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
            setLoading(false)
        }
    }



    return (
        <div className=''>
            <Toaster />
            <div className='w-[500px] rounded-md mx-auto px-5 mt-28'>

                <form onSubmit={handleSignup} className='flex flex-col gap-3 mt-7'>
                    <input required onChange={handleChange} name='name' type="text" placeholder='Full name' className='text-sm w-full py-4 px-5 rounded-md border' />
                    <input required onChange={handleChange} name='email' type="email" placeholder='Email address' className='text-sm w-full py-4 px-5 rounded-md border' />
                    <input required onChange={handleChange} name='password' type="password" placeholder='Password' className='text-sm w-full py-4 px-5 rounded-md border' />
                    {
                        loading ?
                            <button type='button' className='text-white bg-main_dark font-bold rounded-md tracking-widest w-full h-[50px] text-center'>{loading ? <Loader height='h-4' width='w-4' /> : 'SIGNUP'}</button>
                            :
                            <button type='submit' className='text-white bg-main_dark font-bold rounded-md tracking-widest w-full h-[50px] text-center'>{loading ? <Loader height='h-4' width='w-4' /> : 'SIGNUP'}</button>
                    }
                    <div className='mt-3 py-3 border-t'>
                        <p className='text-sm text-main_dark'>Already have an account? <Link href={'/login'} className='text-blue-700' >Login</Link></p>
                    </div>
                </form>

            </div>
        </div>

    );
}




export default SignUp;