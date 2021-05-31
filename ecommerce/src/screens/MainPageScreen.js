import React, { useState,useEffect}from 'react'
import { Button, Col, Pagination, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {orderLists} from "../actions/orderAction"
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Baner from '../components/Baner';
import { getUserDetail } from "../actions/userAction"
const MainPageScreen = (props) => {
    const keyword = props.match.params.keyword;
    const pageNumber = props.match.params.pageNumber || 1
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList;
    const[filterProducts,setFilterProducts]=useState([])
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
        dispatch(orderLists(''))
        dispatch(getUserDetail('profile'))
         dispatch(listProducts('',''))
    }, [dispatch, keyword, pageNumber])
    
    useEffect(() => {
        if (products && products.length >0)
        {   
            
           filterProductData(products)
        }
    }, [products])
    const filterProductData = (products) => {
         let categories = ([...new Set(products.map(ele => ele.category))])
           
            let filterArray = [...categories.map((ele,index) => {
              return  {category:ele,categoryList:[...products.filter((data, id) => data.category === ele)]}
            })]
            
            setFilterProducts(filterArray)
            
    }
    return (
        <>
            <Meta />
            <div className="main-page-baner" >
             <Baner />
            </div>
           
            {  filterProducts && filterProducts.length>0 ? filterProducts.map((data, i) => (
                 <>
                    <Row className="mt-3">
                        <Col xs={8} sm={8} md={9} lg={9} >
                            <h1 style={{marginBottom:"-20px"}}>{data.category}</h1>
                        </Col>
                        <Col xs={4} sm={4} md={3} lg={3}  style={{ display: "flex", justifyContent: "flex-end",textAlign:"center" }}>
                            <Link to={`/products/${data.category}`}>
                                 <p  className="mt-3 text-info" style={{fontSize:"18px"}}>View more</p>
                            </Link>
                           
                        </Col>
                   </Row>
                    
                    <hr style={{marginTop:"1px"}}/>
               <Row>
                {
                            data.categoryList.map((ele, i) => {
                                if (i < 4) {
                                 return   <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Product product={ele} />
                                    </Col>
                                }
                        
                            })
                }
               
                    </Row>
                    {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword:""} /> */}
                    </>
            )) : <h2>{products ? <Loader />:<Message variant="success">Not found products</Message> }</h2>
               
            }
            
        </>
    )
}

export default MainPageScreen
