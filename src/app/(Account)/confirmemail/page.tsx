'use client'

import { Loader } from '@/components';
import Cookies from 'js-cookie';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

function ConfirmEmail() {

    const router = useRouter()

    const [otp, setOtp] = useState('');
    const [otpSentTimer, setOtpSentTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [loading, setLoading] = useState(false)
    const [resendOtpLoading, setResendOtpLoading] = useState(false)
    const [email, setEmail] = useState('')


    useEffect(() => {
        const email = Cookies.get('user_email')
        if (!email || !email.toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            router.push('/login')
        }
        else {
            setEmail(email)
            console.log(email)
        }
    }, [])

    useEffect(() => {
        console.log("useEffect")
        let interval: NodeJS.Timer
        if (isTimerRunning) {
            interval = setInterval(() => setOtpSentTimer((prevTimer) => prevTimer - 1), 1000);
            if (otpSentTimer === 0) {
                clearInterval(interval)
                setIsTimerRunning(false)
            }
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, otpSentTimer]);

    const verifyOtp = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {

            const response = await fetch('/api/v1/verifyotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            })

            const data = await response.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            toast.success(data.message, {
                duration: 4000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });
            setTimeout(() => {
                router.push('/login')
            }, 3000);
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
        }
        finally {
            setLoading(false)
        }
    }

    const ReSendOTP = async () => {
        setResendOtpLoading(true)
        try {
            const response = await fetch('/api/v1/resendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const data = await response.json()
            if (data.status === 'error') {
                throw new Error(data.message)
            }
            setOtpSentTimer(30)
            setIsTimerRunning(true)
            // const timer = setInterval(() => {
            //     // if (otpSentTimer === 0) {
            //     //     console.log("timer cleara", otpSentTimer);
            //     //     clearInterval(timer)
            //     // }
            //     console.log(otpSentTimer)
            //     setOtpSentTimer(otpSentTimer - 1)
            // }, 1000)
            toast.success(data.message, {
                duration: 3000,
                position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

                style: {
                    backgroundColor: '#d9d9d9',
                    padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
            });

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
        }
        finally {
            setResendOtpLoading(false)
        }
    }

    return (
        <div>
            <Toaster />
            <div className='w-[500px] rounded-md mx-auto px-5 mt-28'>
                {
                    !email ? ''
                        :
                        <form onSubmit={verifyOtp} className='flex flex-col gap-3 mt-7'>
                            <div className='mb-5'>
                                <h1 className='text-xl text-main_dark font-bold'>Please enter OTP to verify your account</h1>
                                <p className='text-sm text-zinc-600 mt-1'>OTP has been sent {email}</p>
                            </div>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputType='number'
                                // renderSeparator={<span>-</span>}
                                containerStyle={{ width: '100%', display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}
                                inputStyle={{ border: '1px solid #bdbdbd', width: '100%', padding: '20px 0', fontSize: '20px' }}
                                renderInput={(props) => <input {...props} />}
                            />
                            {/* <input required onChange={handleChange} name='password' type="password" placeholder='Password' className='text-sm w-full py-4 px-5 rounded-md border' /> */}
                            <button type='submit' className='text-white bg-main_dark font-bold rounded-md tracking-widest w-full h-[50px] text-center'>{loading ? <Loader height='h-4' width='w-4' /> : 'Verify'}</button>
                            {
                                resendOtpLoading ?
                                    <div className='text-sm text-blue-700 cursor-pointer relative'>
                                        <p>Resend OTP </p>
                                        <span className='h-full absolute top-0 w-[100px] text-zinc-800 bg-[#ffffffdc] z-10'><Loader width='w-4' height='h-4' /></span>
                                    </div>
                                    :
                                    otpSentTimer ?
                                        <p className='text-sm text-zinc-700'>You can resend OTP after <span className='text-base font-semibold'>{otpSentTimer}</span> seconds</p>
                                        :
                                        <p onClick={ReSendOTP} className='text-sm text-blue-700 cursor-pointer relative'>
                                            Resend OTP
                                        </p>
                            }
                        </form>
                }
            </div>
        </div>
    );
}

export default ConfirmEmail;