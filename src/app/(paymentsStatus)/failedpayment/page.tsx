import Link from 'next/link';
import { BsFillBagXFill } from 'react-icons/bs'

function FailedPayment() {
    return (
        <div className=''>
            <div className='w-[90%] xl:w-[1350px] mx-auto flex flex-col justify-center items-center py-20'>
                <BsFillBagXFill size={60} className='text-red-600' />
                <h1 className='text-main_dark text-4xl font-bold mt-5 red_shadow'>Opps, Could&#39;nt fulfill your order</h1>
                <p className='text-main_dark mt-5'>If you have any questions, please email <a href="mailto:okashatanoli12345@gmail.com" className='text-blue-800'>okashatanoli12345@gmail.com</a></p>
                <Link href={'/'} ><button className='text-white cursor-pointer font-semibold flex justify-center items-center gap-3 py-3 px-10 mt-10 bg-main_dark'>Continue Shopping</button></Link>
            </div>
        </div>
    );
}

export default FailedPayment;