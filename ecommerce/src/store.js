import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer,productFilterReducer, productDetailReducer,deleteProductReducer,createProductReducer ,updateProductReducer,createProductReviewReducer} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import {userLoginReducers,userRegisterReducers,userDetailsReducers,userUpdateProfileReducers,userListReducers,userUpdateReducers,userDeleteReducers} from "./reducers/userReducers"
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListReducer,ordersReducer,ordersDeliverReducer } from "./reducers/orderReducer";
const reducer = combineReducers({
    productList: productReducer,
    productFilterList:productFilterReducer,
    productDetail: productDetailReducer,
    deleteProductDetail: deleteProductReducer,
    productCreate: createProductReducer,
    productUpdate: updateProductReducer,
    productReviewCreate:createProductReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate:userUpdateReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    allOrders: ordersReducer,
    orderDeliver:ordersDeliverReducer,
   
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
    
const userLoginFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
    
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) :{}
    
const initialState = {
    cart: { cartItems: cartItemsFromStorage,shippingAddress:shippingAddressFromStorage },
    userLogin: { userInfo: userLoginFromStorage },
    userRegister: { userInfo: userLoginFromStorage }
    
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;