'use client'

import { ContextApi } from '@/store/context';
import { useContext, useState } from 'react';
import { IContext } from '../../../types/ProductsTypes';
import Image from 'next/image';
import Img from '../../../public/images/test.png'
import { MdOutlineDelete } from 'react-icons/md'
import { urlForImage } from '../../../sanity/lib/image';
import { BiShoppingBag } from 'react-icons/bi'
import { Loader } from '@/components';

function Cart() {

    const { state, dispatch }: IContext = useContext(ContextApi)
    console.log(state.cart_items)

    const [loading, setLoading] = useState(false)

    function IncrementQuantity(_id: string, size: string) {
        dispatch({ type: 'INCREMENT_PRODUCT', payload: { _id, size } })
    }

    function DecrementQuantity(_id: string, size: string) {
        dispatch({ type: 'DECREMENT_PRODUCT', payload: { _id, size } })
    }

    function DeleteProduct(_id: string, size: string) {
        dispatch({ type: 'DELETE_PRODUCT', payload: { _id, size } })
    }

    function SubTotal() {
        let total = 0
        for (let i = 0; i < state.cart_items.length; i++) {
            total += (state.cart_items[i].price * state.cart_items[i].quantity)
        }
        return total
    }

    function TotalQuantity() {
        let total = 0
        for (let i = 0; i < state.cart_items.length; i++) {
            total += state.cart_items[i].quantity
        }
        return total
    }

    async function CheckOut() {
        // const stripe = await getStripe();
        setLoading(true)
        const res = await fetch("/api/v1/payment", {
            method: "POST",
            body: JSON.stringify({ cartItems: state.cart_items }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()
        console.log(data)
        if (data.url) {
            window.location.assign(data.url)
        }
        setLoading(false)
    }

    return (
        <div className='mt-20'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <div className='w-[90%] mx-auto '>
                    <h1 className='text-2xl text-main_dark font-bold'>Shopping Cart</h1>
                    {
                        !state.cart_items.length ?
                            <div className='flex flex-col justify-center items-center py-10'>
                                <BiShoppingBag className='text-[80px] md:text-[120px]' />
                                <h1 className='text-xl md:text-3xl font-bold text-center'>Your shopping bag is empty</h1>
                            </div>
                            :
                            <div className='block lg:flex justify-between items-start mt-10 relative'>
                                <div className='w-full lg:w-[65%]'>
                                    {
                                        state.cart_items.map((item, index) => {
                                            return (
                                                <div key={index} className='py-10 border-b flex flex-col md:flex-row gap-7 justify-between'>
                                                    <div className='overflow-hidden flex-shrink-0 flex justify-center'>
                                                        <Image src={item.image} alt='img' width={1000} height={1000} className='w-[180px] h-[200px] rounded-lg object-cover' />
                                                    </div>
                                                    <div className='flex-grow flex flex-col justify-between gap-3 md:gap-0'>
                                                        <div className='flex justify-between gap-5'>
                                                            <h1 className='text-[21px] text-main_dark'>{item.title}</h1>
                                                            <MdOutlineDelete onClick={() => DeleteProduct(item._id, item.size)} size={30} className='text-main_dark cursor-pointer flex-shrink-0' />
                                                        </div>
                                                        <p className='text-[#666666] font-semibold'>{item.type}</p>
                                                        <p className='text-main_dark font-bold flex items-center gap-5'>Size: <span className='text-sm w-[35px] h-[35px] rounded-full flex justify-center items-center bg-pink-200'>{item.size}</span></p>
                                                        <div className='flex justify-between gap-5'>
                                                            <p className='text-lg text-main_dark font-bold tracking-widest'>${item.price}</p>
                                                            <div className='flex items-center gap-3'>
                                                                <button onClick={() => DecrementQuantity(item._id, item.size)} className='w-[30px] h-[30px] cursor-pointer flex justify-center items-center text-xl rounded-md bg-gray-200'>-</button>
                                                                <p className='w-[30px] text-center'>{item.quantity}</p>
                                                                <button onClick={() => IncrementQuantity(item._id, item.size)} className='w-[30px] h-[30px] cursor-pointer flex justify-center items-center text-xl rounded-md bg-gray-200'>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='w-full lg:w-[30%] p-7 bg-[#f0f1f2] flex flex-col gap-7 md:sticky md:top-10 mt-10 lg:mt-0'>
                                    <h3 className='text-[19px] font-bold'>Order Summary</h3>
                                    <div className='flex justify-between'>
                                        <p className='text-main_dark'>Quantity</p>
                                        <p className='text-main_dark'>{TotalQuantity()} Product</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-main_dark'>Sub Total</p>
                                        <p className='text-main_dark'>${SubTotal()}</p>
                                    </div>
                                    <button onClick={CheckOut} className='w-full text-white cursor-pointer text-sm font-semibold flex justify-center items-center gap-3 h-[40px] bg-main_dark'>
                                        {loading ? <Loader height='h-4' width='w-4' /> : 'Process to Checkout'}
                                    </button>
                                </div>

                            </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Cart;