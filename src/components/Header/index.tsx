'use client'

import Image from 'next/image';
import Logo from '../../../public/images/logo.png'
import { BiSearch } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { CgShoppingCart, CgMenuRightAlt } from 'react-icons/cg'
import { Arimo } from 'next/font/google';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { ContextApi } from '@/store/context';
import { IContext } from '../../../types/ProductsTypes';

const arimo = Arimo({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin']
})


function CartButton({ totalCartItems }: { totalCartItems: number }) {
    return (
        <Link href={'/cart'}>
            <div className='w-[46px] h-[46px] flex justify-center items-center relative bg-[#F1F1F1] rounded-full'>
                <CgShoppingCart size={22} />
                <span className={`absolute top-0 right-[5px] text-xs font-semibold ${arimo.className} bg-[#F02D34] text-white flex justify-center items-start leading-3 rounded-full w-[18px] h-[18px]`}>{totalCartItems}</span>
            </div>
        </Link>
    )
}


function Header() {

    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const { state, dispatch }: IContext = useContext(ContextApi)


    return (
        <>
            <div className={`${open ? 'flex' : 'hidden'} justify-center items-center lg:hidden bg-white absolute top-0 left-0 w-full h-screen`}>
                <div className='absolute top-0 w-[90%] m-auto flex justify-between items-center h-[105px]'>
                    <Link href={'/'}><Image src={Logo} alt='logo' className='w-[140px] h-[25px]' /></Link>
                    <div onClick={() => setOpen(false)}>
                        <RxCross2 size={30} />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='block lg:hidden  mb-4'>
                        <CartButton totalCartItems={state.cart_items.length} />
                    </div>
                    <ul className='flex flex-col gap-4 text-center'>
                        <Link href={'/category/female'}><li>Female</li></Link>
                        <Link href={'/category/male'}><li>Male</li></Link>
                        <Link href={'/category/kids'}><li>Kids</li></Link>
                        <Link href={'/category/all'}><li>All Products</li></Link>
                    </ul>
                </div>
            </div>
            <div>
                <div className='w-[90%] xl:w-[1350px] mx-auto h-[105px] flex justify-between items-center'>
                    <Link href={'/'}><Image src={Logo} alt='logo' className='w-[140px] h-[25px]' /></Link>
                    <ul className='hidden lg:flex gap-12'>
                        <Link href={'/category/female'}><li>Female</li></Link>
                        <Link href={'/category/male'}><li>Male</li></Link>
                        <Link href={'/category/kids'}><li>Kids</li></Link>
                        <Link href={'/category/products'}><li>All Products</li></Link>
                    </ul>
                    <div className='hidden lg:flex border rounded-md w-[30%] overflow-hidden'>
                        <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder='What you looking for' className='w-full border-none py-[4px] px-5 placeholder:text-zinc-500 placeholder:font-sans placeholder:tracking-tight bg-transparent text-sm' />
                        <Link href={`/search?s=${searchText}`} className='w-[30px] flex justify-center items-center bg-main_dark'>
                            <BiSearch size={16} className='text-white font-bold' />
                        </Link>
                    </div>
                    <div className='hidden lg:block'>
                        <CartButton totalCartItems={state.cart_items.length} />
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