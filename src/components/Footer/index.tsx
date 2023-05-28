import Image from 'next/image';
import Logo from '../../../public/images/logo.png'
import { AiOutlineTwitter } from 'react-icons/ai'
import { GrFacebookOption, GrLinkedinOption } from 'react-icons/gr'

function Footer() {
    return (
        <div className='mt-36 mb-20'>
            <div className='w-[90%] xl:w-[1350px] mx-auto'>
                <div className='flex flex-col md:flex-row justify-between gap-10 md:gap-5'>
                    <div className='w-full md:w-[40%] flex flex-col gap-10'>
                        <Image src={Logo} alt='logo' className='w-[200px]' />
                        <p className='text-[#666] w-full md:w-[90%]'>Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                        <div className='flex gap-5'>
                            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#f1f1f1] rounded-xl'>
                                <AiOutlineTwitter size={25} />
                            </div>
                            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#f1f1f1] rounded-xl'>
                                <GrFacebookOption size={22} />
                            </div>
                            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#f1f1f1] rounded-xl'>
                                <GrLinkedinOption size={22} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-[20%] text-[#666]'>
                        <h1 className='text-[19px] font-bold'>Company</h1>
                        <ul className='mt-5 flex flex-col gap-3'>
                            <li>About</li>
                            <li>Terms of Use</li>
                            <li>Privacy Policy</li>
                            <li>How it Works</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className='w-full md:w-[20%] text-[#666]'>
                        <h1 className='text-[19px] font-bold'>Support</h1>
                        <ul className='mt-5 flex flex-col gap-3'>
                            <li>Support Carrer</li>
                            <li>24h Service</li>
                            <li>Quick Chat</li>
                        </ul>
                    </div>
                    <div className='w-full md:w-[20%] text-[#666]'>
                        <h1 className='text-[19px] font-bold'>Contact</h1>
                        <ul className='mt-5 flex flex-col gap-3'>
                            <li>Whatsapp</li>
                            <li>Support 24h</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;