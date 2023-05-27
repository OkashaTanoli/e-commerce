'use client'

import Image from 'next/image';
import Logo from '../../../public/images/logo.png'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import { CgShoppingCart, CgMenuRightAlt } from 'react-icons/cg'
import { Arimo } from 'next/font/google';
import { useState } from 'react';

const arimo = Arimo({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin']
})


function CartButton() {
    return (
        <div className='w-[46px] h-[46px] flex justify-center items-center relative bg-[#F1F1F1] rounded-full'>
            <CgShoppingCart size={22} />
            <span className={`absolute top-0 right-[5px] text-xs font-semibold ${arimo.className} bg-[#F02D34] text-white flex justify-center items-start leading-3 rounded-full w-[18px] h-[18px]`}>0</span>
        </div>
    )
}


function Header() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={`${open ? 'flex' : 'hidden'} justify-center items-center lg:hidden bg-white absolute top-0 left-0 w-full h-screen`}>
                <div className='absolute top-0 w-[90%] m-auto flex justify-between items-center h-[105px]'>
                    <Image src={Logo} alt='logo' className='w-[140px] h-[25px]' />
                    <div onClick={() => setOpen(false)}>
                        <RxCross2 size={30} />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='block lg:hidden  mb-4'>
                        <CartButton />
                    </div>
                    <ul className='flex flex-col gap-4 text-center'>
                        <li>Female</li>
                        <li>Male</li>
                        <li>Kids</li>
                        <li>All Products</li>
                    </ul>
                </div>
            </div>
            <div>
                <div className='w-[90%] xl:w-[1350px] mx-auto h-[105px] flex justify-between items-center'>
                    <Image src={Logo} alt='logo' className='w-[140px] h-[25px]' />
                    <ul className='hidden lg:flex gap-12'>
                        <li>Female</li>
                        <li>Male</li>
                        <li>Kids</li>
                        <li>All Products</li>
                    </ul>
                    <div className='hidden lg:flex items-center border rounded-md w-[30%]'>
                        <div className='w-[27px] flex justify-center items-center'>
                            <CiSearch size={16} />
                        </div>
                        <input type="text" placeholder='What you looking for' className='border-none py-[3px] placeholder:text-zinc-500 placeholder:font-sans placeholder:tracking-tight bg-transparent text-sm' />
                    </div>
                    <div className='hidden lg:block'>
                        <CartButton />
                    </div>
                    <div onClick={() => setOpen(true)} className='flex lg:hidden'>
                        <CgMenuRightAlt size={30} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;