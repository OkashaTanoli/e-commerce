import { Hero, Products, Promotions } from '@/components'
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <Hero />
            <Promotions />
            <Products />
        </div>
    )
}
