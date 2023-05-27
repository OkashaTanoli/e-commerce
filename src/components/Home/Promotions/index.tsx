import Image from 'next/image';
import Event1 from '../../../../public/images/event1.png'
import Event2 from '../../../../public/images/event2.png'
import Event3 from '../../../../public/images/event3.png'
import DoubleHeading from '@/components/DoubleHeading';


function Promotions() {
    return (
        <div className='mt-28'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <DoubleHeading sub='PROMOTIONS' main='Our Promotions Events' />
                <div className='flex flex-col lg:flex-row gap-10 mt-10'>
                    <div className='w-full lg:w-[55%] flex flex-col gap-5'>
                        <div className='h-1/2 pt-5 md:pt-0 block md:flex justify-between items-center bg-light_gray px-5 md:px-10'>
                            <div>
                                <h1 className='text-[20px] md:text-[28px] text-main_dark font-bold text-center md:text-left'>GET UP TO <span className='text-4xl'>60%</span> </h1>
                                <p className='text-lg text-center md:text-left'>For the summer season</p>
                            </div>
                            <div className='flex justify-center'>
                                <Image src={Event1} alt='event' className='h-full' />
                            </div>
                        </div>
                        <div className='h-1/2 py-10 flex flex-col justify-center text-white bg-main_dark'>
                            <h1 className='text-3xl md:text-4xl font-bold text-center'>GET 30% Off</h1>
                            <p className='text-sm text-center mt-5'>USE PROMO CODE</p>
                            <h1 className='w-fit py-2 px-5 md:px-10 font-bold tracking-[4px] mt-1 rounded-lg bg-[#474747] mx-auto'>DINEWEEKENDSALE</h1>
                        </div>
                    </div>
                    <div className='w-full lg:w-[45%] flex flex-col md:flex-row gap-5'>
                        <div className='w-full md:w-1/2 pt-5 flex flex-col gap-5 bg-[#EFE1C7]'>
                            <div className='text-main_dark px-5'>
                                <p className='text-sm'>Flex Sweatshirt</p>
                                <p className='text-[16px]'><del>$100.00</del> <span className='font-bold text-[18px] ml-2'>$75.00</span></p>
                            </div>
                            <div className='flex-grow flex items-end justify-center '>
                                <Image src={Event2} alt='event' className='h-full' />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 pt-5 flex flex-col gap-5 bg-[#D7D7D9]'>
                            <div className='text-main_dark px-5'>
                                <p className='text-sm'>Flex Push Button Bomber</p>
                                <p className='text-[16px]'><del>$225.00</del> <span className='font-bold text-[18px] ml-2'>$190.00</span></p>
                            </div>
                            <div className='flex-grow flex items-end justify-center'>
                                <Image src={Event3} alt='event' className='h-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Promotions;