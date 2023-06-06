'use client'

import React, { createContext, ReactHTMLElement, ReactNode, useReducer } from "react";
import Reducer from "./reducer";
import Cookies from 'js-cookie'
import { ICartItem, IContext, IState } from "../../types/ProductsTypes";



// const cartCookiesData = Cookies.get('cartData')
// let cartData: ICartItem[] | []
// if (cartCookiesData) {
//     cartData = JSON.parse(cartCookiesData)
// }
// else {
//     cartData = []
// }

let cartData: ICartItem[] = []


let data: IState = {
    cart_items: cartData
}


export const ContextApi = createContext<IContext>({ state: data, dispatch: () => null });

export const CreateContext = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, data);
    return (
        <ContextApi.Provider value={{ state, dispatch }}>
            {children}
        </ContextApi.Provider>
    )

}