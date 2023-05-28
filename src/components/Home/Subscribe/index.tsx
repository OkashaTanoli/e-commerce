import React from 'react';

function Subscribe() {
    return (
        <div className='mt-28'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <div className='flex flex-col items-center relative'>
                    <div className='absolute w-full h-full flex justify-center items-center'>
                        <h1 className='text-[3rem] ml:text-[4rem] md:text-[6rem] lg:text-[6.85rem] font-extrabold tracking-wide leading-none text-main_dark opacity-[0.07]'>Newletter</h1>
                    </div>
                    <h1 className='text-3xl md:text-4xl text-main_dark font-bold text-center mt-4'>Subscribe Our Newsletter</h1>
                    <p className='font-light text-center text-main_dark mt-5'>Get the latest information and promo offers directly</p>
                    <div className='block md:flex mt-8 mx-auto w-[90%] md:w-auto z-20'>
                        <input type="text" placeholder='Input email address' className='text-sm text-main_dark py-2 px-7 border w-full mdw-[300px] border-main_dark' />
                        <div className='text-white text-sm font-semibold cursor-pointer w-full md:w-[170px] mt-3 md:mt-0 flex items-center justify-center py-2 bg-main_dark'>
                            Get Started
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscribe;