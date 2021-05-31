import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS,PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_FILTER_REQUEST, PRODUCT_FILTER_SUCCESS, PRODUCT_FILTER_FAIL } from "../constants/productConstants"
import axios from "axios"
export const listProducts = (keyword='',filterDropdown='') => async (dispatch) => {
     
   try {
       dispatch({ type: PRODUCT_REQUEST })
       const result = await axios.get(`/api/products`);
       
      
       if (filterDropdown === 'rating' && keyword) {
          
         result.data.sort((a, b) => b.rating - a.rating)
      
       }
       if (filterDropdown === 'lowHighPrice' && keyword) {
         result.data.sort((a, b) => a.price - b.price)
     
       }
       if (filterDropdown === 'highLowPrice' && keyword) {
         result.data.sort((a, b) => b.price - a.price)
      
       }
      
      dispatch({ type: PRODUCT_SUCCESS, payload: result.data }); 
       
   } catch (error) {
       dispatch({ type: PRODUCT_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const listFilterProducts = (keyword = '',pageNumber ='') => async (dispatch) => {
    
   try {
       dispatch({ type: PRODUCT_FILTER_REQUEST })
       const result = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
       dispatch({ type: PRODUCT_FILTER_SUCCESS, payload: result.data });

   } catch (error) {
       dispatch({ type: PRODUCT_FILTER_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const listSingleProduct = (id) => async (dispatch) => {
   try {
       dispatch({ type: PRODUCT_DETAIL_REQUEST })
       const result = await axios.get(`/api/products/${id}`);
       dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: result.data });

   } catch (error) {
       dispatch({ type: PRODUCT_DETAIL_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const deleteProduct = (id) => async (dispatch,getState) => {
   try {
       dispatch({ type: PRODUCT_DELETE_REQUEST })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
       await axios.delete(`/api/products/${id}`,config);
       dispatch({ type: PRODUCT_DELETE_SUCCESS});

   } catch (error) {
       dispatch({ type: PRODUCT_DELETE_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const createProduct = () => async (dispatch,getState) => {
   try {
       dispatch({ type: PRODUCT_CREATE_REQUEST })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
      const result= await axios.post(`/api/products`,{},config);
       dispatch({
           type: PRODUCT_CREATE_SUCCESS,
           payload:result.data
       });

   } catch (error) {
       dispatch({ type: PRODUCT_CREATE_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const updateProduct = (product) => async (dispatch,getState) => {
   try {
       dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
      const result= await axios.put(`/api/products/${product._id}`,product,config);
       dispatch({
           type: PRODUCT_UPDATE_SUCCESS,
           payload:result.data
       });

   } catch (error) {
       dispatch({ type: PRODUCT_UPDATE_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}

export const createProductReview = (productId,review) => async (dispatch,getState) => {
   try {
       dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        const {userLogin:{userInfo}}=getState() //get state of login user
        const config = { //we r sending data to headers in json
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/reviews`,review,config);
       dispatch({
           type: PRODUCT_CREATE_REVIEW_SUCCESS
       });

   } catch (error) {
       dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message }) 
   }
    
}