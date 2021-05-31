import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET, ORDER_PAY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
   
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
             return {loading:true}
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order:action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {loading:true, orderItems:[],shippingAddress:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order:action.payload
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
               
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
               ...state,
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders:action.payload
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case ORDER_LIST_RESET:
            return {orders:[]}
        
        default:
            return state
    }
}

export const ordersReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
               ...state,
                loading: true
            }
        case ORDER_SUCCESS:
            return {
                loading: false,
                orders:action.payload
            }
        case ORDER_FAIL:
            return {
                loading: false,
                error:action.payload
            }
       
        default:
            return state
    }
}

export const ordersDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
               ...state,
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}



