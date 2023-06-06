import Cookies from 'js-cookie';
import { v4 as uuidv4, validate } from 'uuid';
import { ICartItem, IState } from '../../types/ProductsTypes';

const Reducer = (state: IState, action: { type: string, payload: any }) => {
    switch (action.type) {

        case 'ADD_TO_CART':
            // let cart: any = Cookies.get('cartData')
            // let updatedCart;
            // if (cart) {
            //     let parsedCart = JSON.parse(cart)
            //     updatedCart = JSON.stringify([...parsedCart, action.payload])
            // }
            // else {
            //     updatedCart = JSON.stringify([action.payload])
            // }
            // Cookies.set('cartData', updatedCart)
            let exists = false
            state.cart_items = state.cart_items.map((val: ICartItem) => {
                if (val.productId === action.payload.productId && val.size === action.payload.size) {
                    val.quantity += action.payload.quantity;
                    exists = true
                }
                return val
            })

            state.cart_items = !exists ? [...state.cart_items, action.payload] : state.cart_items
            return { ...state }


        case 'INCREMENT_PRODUCT':
            // console.log(action.payload)
            state.cart_items = state.cart_items.map((item) => {
                if (item._id === action.payload._id && item.size === action.payload.size) {
                    item.quantity += 1
                }
                return item
            })
            return { ...state }


        case 'DECREMENT_PRODUCT':
            state.cart_items = state.cart_items.map((item) => {
                if (item._id === action.payload._id && item.size === action.payload.size) {
                    if (item.quantity > 1) {
                        item.quantity -= 1
                    }
                }
                return item
            })
            return { ...state }


        case 'DELETE_PRODUCT':
            state.cart_items = state.cart_items.filter((item) => item._id !== action.payload._id && item.size !== action.payload.size)
            return { ...state }

        default:
            return state
    }
}
export default Reducer