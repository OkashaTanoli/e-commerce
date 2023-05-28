import { Hero, Products, Promotions, Subscribe, UniqueJewellery } from '@/components'
import Image from 'next/image'

export default async function Home() {
    return (
        <div>
            <Hero />
            <Promotions />
            <Products />
            <UniqueJewellery />
            <Subscribe />
        </div>
    )
}
