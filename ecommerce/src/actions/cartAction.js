import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants"
import axios from "axios"
export const addToCart = (id, qty) => async (dispatch, getState) => {
    
    const result = await axios.get(`/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: result.data._id,
            name: result.data.name,
            image: result.data.image,
            price: result.data.price,
            countInStock: result.data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    const result = await axios.get(`/api/products/${id}`);
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)) //updating localstorage
}
export const saveShippingAddress = (data) => async (dispatch) => {
   
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress',JSON.stringify(data)) //updating localstorage
}
export const savePaymentMethod = (data) => async (dispatch) => {
    
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod',JSON.stringify(data)) //updating localstorage
}
