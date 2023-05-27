import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg'
import HeroImage from '../../../../public/images/hero.png'
import Featured1 from '../../../../public/images/Featured1.png'
import Featured2 from '../../../../public/images/Featured2.png'
import Featured3 from '../../../../public/images/Featured3.png'
import Featured4 from '../../../../public/images/Featured4.png'


function Hero() {
    return (
        <div className='pt-10 overflow-hidden'>
            <div className='w-[90%] lg:w-[1200px] xl:w-[1350px] ml-[5%] xl:ml-auto mx-auto block lg:flex justify-between items-center gap-5'>
                <div className='w-full lg:w-[45%] flex flex-col gap-7 md:gap-10'>
                    <p className='w-[120px] font-semibold py-2 text-center text-[#0000FF] bg-[#E1EDFF] rounded-lg'>
                        Sale 70%
                    </p>
                    <h1 className='text-main_dark text-4xl md:text-[3.5rem] leading-none md:leading-[55px] font-bold tracking-[0.03rem]'>
                        An Industrial Take on Streetwear
                    </h1>
                    <p className='text-[#666666] w-full md:w-[80%]'>
                        Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
                    </p>
                    <div className='text-white font-semibold flex justify-center items-center gap-3 w-[220px] py-4 bg-main_dark'>
                        <CgShoppingCart size={30} />
                        <p>Start Shopping</p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 mt-8 md:mt-16'>
                        <Image src={Featured1} alt='featured1' />
                        <Image src={Featured2} alt='featured2' />
                        <Image src={Featured3} alt='featured3' />
                        <Image src={Featured4} alt='featured4' />
                    </div>
                </div>
                <div className='w-[55%] hidden lg:flex justify-end'>
                    <div className='w-[600px] h-[600px] relative bg-light_pink rounded-full'>
                        <Image src={HeroImage} alt='hero' className='absolute object-cover -top-[5%] h-[650px]' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;