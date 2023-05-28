import DoubleHeading from '@/components/DoubleHeading';
import Img from '../../../../public/images/event1.png'
import Image from 'next/image';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as SanityImage } from 'sanity';

interface IData {
    images: SanityImage[],
    title: string,
    price: number
}

export default (async function Products() {
    const data: IData[] = await client.fetch(`*[_type == 'products']{images, price, title}[0..2]`)
    console.log(data)
    return (
        <div className='mt-28'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <DoubleHeading sub='PRODUCTS' main='Check What We Have' />
                <div className='mt-20'>
                    <div className='grid lg:grid-cols-3 gap-16'>
                        {
                            data.map((val: IData, index: number) => {
                                return (
                                    <div key={index} className='hover:scale-110 transition-all duration-[.5s]'>
                                        <div className='h-[400px] flex justify-center bg-light_gray'>
                                            <Image src={urlForImage(val.images[0]).url()} width={1000} height={1000} alt='image' className='object-cover w-auto h-full' />
                                        </div>
                                        <div className='mt-5'>
                                            <h1 className='text-main_dark text-lg font-semibold'>{val.title}</h1>
                                            <h1 className='text-main_dark text-[19px] font-bold'>$ {val.price}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
} as unknown as () => JSX.Element)

