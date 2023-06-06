import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { Image as SanityImage } from 'sanity';
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";

interface IData {
    images: SanityImage[],
    price: number,
    title: string,
    type: string,
    slug: {
        current: string
    }
}


const getData = async (searchText: string) => {
    const response = await client.fetch(`*[_type == 'products' && (title match "${searchText}" || type match "${searchText}")]{images, price, title, type, slug}`)
    return response
}


async function Category({ params, searchParams }: { params: any, searchParams: { s: string } }) {
    const data: IData[] = await getData(searchParams.s)
    // console.log(data)
    return (
        <div className="mt-20">
            <div className="w-[90%] xl:w-[1350px] mx-auto">
                {
                    !data.length ?
                        <div className="h-[40vh] flex justify-center items-center">
                            <h1 className="text-xl text-main_dark font-bold capitalize">No products were found matching your search.</h1>
                        </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 md-lg:grid-cols-3 lg-xl:grid-cols-4 gap-14">
                            {
                                data.map((val: IData, index: number) => {
                                    return (
                                        <Link key={index} href={`/product/${val.slug.current}`}>
                                            <div className="cursor-pointer">
                                                <div className="h-[300px] flex justify-center bg-light_gray">
                                                    <Image src={urlForImage(val.images[0]).url()} alt="image" width={1000} height={1000} className="h-full w-auto object-cover" />
                                                </div>
                                                <div className="mt-5 flex flex-col gap-1">
                                                    <h1 className='text-main_dark text-[17px] font-semibold'>{val.title}</h1>
                                                    <h1 className="text-[15px] font-semibold text-[#888]">{val.type}</h1>
                                                    <h1 className='text-main_dark text-[19px] font-bold'>$ {val.price}</h1>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default Category;
