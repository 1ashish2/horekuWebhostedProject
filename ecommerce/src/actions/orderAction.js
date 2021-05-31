import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
     ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL

} from '../constants/orderConstants'
import axios from 'axios'
export const createOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.post(`/api/orders`,order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: CREATE_ORDER_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}
export const getOrderDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: ORDER_DETAIL_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}

export const payOrder= (orderId,paymentResult) => async (dispatch,getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: ORDER_PAY_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}

export const orderLists= (name='') => async (dispatch,getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.get(`/api/orders/myorders`,config);
        if (name === 'date')
        { 
            result.data.sort((a,b)=> b.createdAt > a.createdAt?-1:1)
        }
        if (name === 'paid')
        {
            result.data.sort((a,b)=> b.isPaid < a.isPaid?-1:1)
        }
         if (name === 'deliver')
        {
            result.data.sort((a,b)=> b.isDelivered < a.isDelivered?-1:1)
        }
        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: ORDER_LIST_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}


export const allOrderList= (name='') => async (dispatch,getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.get(`/api/orders`,config);
        if (name === 'date')
        {
            let aa = result.data.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
           
        }
        if (name === 'paid')
        {
           let aa = result.data.sort((a, b) => b.isPaid < a.isPaid ? -1 : 1)
             
        }
         if (name === 'deliver')
        {
            let aa= result.data.sort((a, b) => b.isDelivered < a.isDelivered ? -1 : 1)
              
        }
       
        dispatch({
            type: ORDER_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: ORDER_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}

export const deliverOrder= (order) => async (dispatch,getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
            
        })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const result = await axios.put(`/api/orders/${order._id}/deliver`,{},config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload:result.data
        })
       
    } catch (error) {
         dispatch({ type: ORDER_DELIVER_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
  
    }
}


