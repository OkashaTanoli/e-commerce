'use client'

import React, { useContext, useState } from 'react';
import { PortableTextBlock } from 'sanity';
import { v4 as uuidv4 } from 'uuid';
import { IAllProductsData, ICartItem, IContext } from '../../../../types/ProductsTypes';
import { CgShoppingCart } from 'react-icons/cg';
import { ContextApi } from '@/store/context';
import toast, { Toaster } from 'react-hot-toast';




function DetailsSection({ data }: { data: IAllProductsData }) {

    const [selectedSize, setSelectedSize] = useState(data.sizes[0])
    const [quantity, setQuantity] = useState(1)
    const { state, dispatch }: IContext = useContext(ContextApi)

    function SelectSize(size: string) {
        if (size === selectedSize) {
            return
        }
        setSelectedSize(size)
        toast.success(`${size.toUpperCase()} size selected`, {
            duration: 1000,
            position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",

            style: {
                backgroundColor: '#d9d9d9',
                padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                fontSize: '14px',
                fontWeight: 'bold'
            },
        });
    }

    function addToCard() {
        let cartData: ICartItem = {
            _id: uuidv4(),
            productId: data._id,
            title: data.title,
            price: data.price,
            image: data.images[0],
            size: selectedSize,
            type: data.type,
            quantity: quantity
        }
        dispatch({ type: 'ADD_TO_CART', payload: cartData })
        toast.success('Product added successfully', {
            position: window.matchMedia("(min-width: 600px)").matches ? "bottom-right" : "bottom-center",
            style: {
                backgroundColor: '#d9d9d9',
                padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                fontSize: '14px',
                fontWeight: 'bold'
            },
        });
    }


    function IncrementQuantity() {
        setQuantity(quantity + 1)
    }


    function DecrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <>
            <Toaster />
            <h4 className='text-sm text-main_dark font-bold'>SELECT SIZE</h4>
            <div className='flex gap-4 mt-5'>
                {
                    data.sizes.map((size: string, index: number) => {
                        return (
                            <button key={index} disabled={size === selectedSize} onClick={() => SelectSize(size)} className={`w-[35px] h-[35px] ${size === selectedSize ? 'bg-pink-200 shadow-lg' : 'bg-zinc-100 '} cursor-pointer text-[#888] font-bold rounded-full flex justify-center items-center`}>
                                {size}
                            </button>
                        )
                    })
                }
            </div>
            <div className='flex gap-5 mt-10 text-main_dark'>
                <h2 className='font-bold'>Quantity: </h2>
                <div className='flex items-center gap-3'>
                    <button onClick={DecrementQuantity} className='w-[30px] h-[30px] cursor-pointer flex justify-center items-center text-xl rounded-md bg-gray-200'>-</button>
                    <p className='w-[30px] text-center'>{quantity}</p>
                    <button onClick={IncrementQuantity} className='w-[30px] h-[30px] cursor-pointer flex justify-center items-center text-xl rounded-md bg-gray-200'>+</button>
                </div>
            </div>
            <div className='mt-10 flex items-center gap-5'>
                <div onClick={addToCard} className='text-white cursor-pointer text-sm font-semibold flex justify-center items-center gap-3 w-[170px] py-[10px] bg-main_dark'>
                    <CgShoppingCart size={22} />
                    <p>Add to Cart</p>
                </div>
                <h1 className='text-2xl text-main_dark font-bold'>${data.price}</h1>
            </div>
        </>
    );
}

export default DetailsSection;