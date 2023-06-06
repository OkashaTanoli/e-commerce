import Image from 'next/image';
import { PortableTextBlock, Image as SanityImage } from 'sanity';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import { DetailsSection, ImageSection } from '@/components';
import { IAllProductsData } from '../../../../types/ProductsTypes';
import { PortableText } from '@portabletext/react'




const getData = async (slug: string) => {
    const response = await client.fetch(`*[_type == "products" && slug.current == "${slug}"]{images, price, title, type, sizes, care, description, _id}[0]`)
    return response
}

async function Product({ params }: { params: { slug: string } }) {

    const data: IAllProductsData = await getData(params.slug)
    // console.log(data)

    return (
        <div className='mt-16'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='w-full lg:w-[60%]'>
                        <ImageSection images={data.images} />
                    </div>
                    <div className='w-full lg:w-[40%] mt-10 lg:mt-0 [@media(min-width:1200px)]:mt-20'>
                        <h1 className='text-[27px] text-main_dark'>{data.title}</h1>
                        <h1 className='text-[21px] text-[#888] font-semibold'>{data.type}</h1>
                        <div className='mt-10'>
                            <DetailsSection data={data} />
                        </div>
                    </div>
                </div>

                <div className='px-4 md:px-14 py-5 bg-gray-50 mt-20'>
                    <div className='relative border-b-2 border-zinc-300'>
                        <div className='my-5 md:my-0 relative md:absolute w-full h-full flex items-center'>
                            <h1 className='text-2xl text-main_dark font-bold'>Product Information</h1>
                        </div>
                        <h1 className='hidden md:block text-[80px] lg:text-[120px] text-main_dark opacity-[0.07] font-bold'>Overview</h1>
                    </div>
                    <div className='mt-10'>
                        <div className='flex flex-col md:flex-row justify-between gap-5'>
                            <h1 className='text-[#666666] font-bold w-full md:w-[35%]'>PRODUCT DETAILS</h1>
                            <div className='text-main_dark [word-spacing:5px] tracking-wider w-full md:w-[65%]'>
                                <PortableText
                                    value={data.description}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-5 mt-10'>
                            <h1 className='text-[#666666] font-bold w-full md:w-[35%]'>PRODUCT CARE</h1>
                            <ul className='text-main_dark font-semibold list-inside list-disc [word-spacing:5px] tracking-wider w-full md:w-[65%]'>
                                {
                                    data.care.map((val, index) => {
                                        return (
                                            <li key={index} className=''>
                                                {val}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {params.slug} */}
            </div>
        </div>
    );
}

export default Product;