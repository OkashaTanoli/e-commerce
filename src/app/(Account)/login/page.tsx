'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';

function Login() {

    function handleLogin(e: FormEvent) {
        e.preventDefault()
    }

    return (
        <div className=''>
            <div className='w-[500px] rounded-md mx-auto px-5 mt-20'>
                <form onSubmit={handleLogin} className='flex flex-col gap-3 mt-7'>
                    <input required type="email" name='email' placeholder='Email address' className='text-sm w-full py-4 px-5 rounded-md border' />
                    <input required type="password" name='password' placeholder='Password' className='text-sm w-full py-4 px-5 rounded-md border' />
                    <button type='submit' className='text-white bg-main_dark font-bold rounded-md tracking-widest py-3 w-full text-center'>LOGIN</button>
                    <div className='mt-3 py-3 border-t'>
                        <p className='text-sm text-main_dark'>Don&apos;t have an account? <Link href={'/signup'} className='text-blue-700' >Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;