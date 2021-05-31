import React, { useState,useEffect}from 'react'
import { Col, Pagination, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';


const Homescreen = (props) => {
    const keyword = props.match.params.keyword;
    const pageNumber = props.match.params.pageNumber || 1
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList;
    const [data, setData] = useState([])
    const [searchProducts,setSearchProducts]=useState([])
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch, keyword])
    useEffect(() => {
       
       
        if (products && products.length > 0 && keyword) {
            const word = keyword.split(" ");
            //let dataList = []
            setData([])
            word.map(name => {
                 products.map(ele => {
                  
                    let i2data = ele.name.toLowerCase().split(" ").includes(name.toLowerCase())

                    if (i2data)
                    {
                        
                        setData(prev => [...prev,ele])
                        
                     }
                     
                }
                )
                products.map(ele => {
                    if (ele.subcategory.toLowerCase() === name.toLowerCase())
                    {
                     setData(prev => [...prev,ele])
                    }
                })
                products.map(ele => {
                    if (ele.brand.toLowerCase() === name.toLowerCase())
                    {
                        setData(prev => [...prev,ele])
                    }
                 })
               
            })
            
            
        }
    }, [products, keyword])
    useEffect(() => {
        if (data && data.length > 0)
        {
           setSearchProducts([...new Set(data)])
           
        }
    },[data])
    
                
    return (
        <>
            <Meta />
            
            <h1>Search results ({ searchProducts && searchProducts.length>0?searchProducts.length:0 })</h1>
            <hr />
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :<>
                    <Row>
                {
                   searchProducts && searchProducts.length>0 ? searchProducts.map((ele, i) => (
                        <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Product product={ele}/>
                        </Col>
                    )):<h3>Not found any products</h3>
                }
               
                    </Row>
                    {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword:""} /> */}
                    </>
            }
           
        </>
    )
}

export default Homescreen
