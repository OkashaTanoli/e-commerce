import { PortableTextBlock, Image as SanityImage } from 'sanity';


export interface IAllProductsData {
    _id: string,
    images: SanityImage[],
    price: number,
    title: string,
    type: string,
    sizes: string[],
    care: string[],
    description: PortableTextBlock
}


export interface ICartItem {
    _id: string,
    productId: string,
    image: SanityImage,
    price: number,
    title: string,
    type: string,
    size: string,
    quantity: number
}

export interface IState {
    cart_items: ICartItem[] | []
}

export type IContext = {
    state: IState,
    dispatch: React.Dispatch<any>
}