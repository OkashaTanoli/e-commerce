import Image from 'next/image';
import Jewellwery from '../../../../public/images/jewellwey.jpg'

function UniqueJewellery() {
    let data = [
        {
            title: 'Using Good Quality Materials',
            text: 'Lorem ipsum dolor sit amt, consectetur adipiscing elit.'
        },
        {
            title: '100% Handmade Products',
            text: 'Lorem ipsum dolor sit amt, consectetur adipiscing elit.'
        },
        {
            title: 'Modern Fashion Design',
            text: 'Lorem ipsum dolor sit amt, consectetur adipiscing elit.'
        },
        {
            title: 'Discount for Bulk OrdersC',
            text: 'Lorem ipsum dolor sit amt, consectetur adipiscing elit.'
        },
    ]
    return (
        <div className='mt-28'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <div className='flex justify-end'>
                    <h1 className='text-3xl md:text-5xl font-bold w-full [@media(min-width:1200px)]:w-[45%] text-main_dark leading-none md:leading-[60px]'>Unique and Authentic Vintage Designer Jewellery</h1>
                </div>
                <div className='flex flex-col gap-10 [@media(min-width:1200px)]:gap-0 [@media(min-width:1200px)]:flex-row items-center mt-10 md:mt-20 [@media(min-width:1200px)]:mt-10'>
                    <div className='w-full [@media(min-width:1200px)]:w-1/2 grid grid-cols-1 ml:grid-cols-2 gap-10 relative'>
                        <div className='absolute w-full h-full flex justify-center items-center'>
                            <h1 className='text-[3rem] ml:text-[4rem] md:text-[6rem] lg:text-[6.85rem] font-extrabold tracking-wide leading-none text-main_dark opacity-[0.07]'>Different from others</h1>
                        </div>
                        {
                            data.map((val, index) => {
                                return (
                                    <div key={index} className='text-main_dark w-full [@media(min-width:1200px)]:w-[70%]'>
                                        <h1 className='text-lg font-semibold leading-[1.1]'>{val.title}</h1>
                                        <p className='font-light tracking-wide mt-4 leading-[1.2]'>{val.text}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-full [@media(min-width:1200px)]:w-1/2 flex flex-col md:flex-row items-center gap-10'>
                        <div className='flex-shrink-0 justify-center'>
                            <Image src={Jewellwery} alt='jewellery' className='w-[250px] sm:w-[300px]' />
                        </div>
                        <div className='flex-grow'>
                            <p className='text-main_dark font-light text-justify leading-relaxed'>This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.</p>
                            <div className='text-white text-sm font-semibold text-center w-[170px] py-3 bg-main_dark mt-10'>
                                See All Product
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniqueJewellery;