'use client'

import Image from 'next/image';
import { Image as SanityImage } from 'sanity';
import { urlForImage } from '../../../../sanity/lib/image';
import { useState } from 'react'



function ImageSection({ images }: { images: SanityImage[] }) {

    const [currentImage, setCurrentImage] = useState(images[0])

    return (
        <div className='w-full flex flex-col md:flex-row gap-7'>
            <div className='flex flex-row md:flex-col gap-4 w-full md:w-[100px]'>
                {
                    images.map((image: SanityImage, index) => {
                        return (
                            <Image key={index} onMouseOver={() => setCurrentImage(image)} src={urlForImage(image).url()} alt='image' width={1000} height={1000} className='w-[60px] ml:w-[80px] md:w-[100px] h-[80px] ml:h-auto object-cover' />
                        )
                    })
                }
            </div>
            <div className='flex-grow'>
                <Image src={urlForImage(currentImage).url()} alt='image' width={1000} height={1000} className='w-full h-auto object-cover' />
            </div>

        </div>
    );
}

export default ImageSection;