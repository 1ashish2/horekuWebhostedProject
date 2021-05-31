import React,{useState,useEffect} from 'react'
import { listProducts } from "../actions/productActions";
import { Button, Col, Pagination, Row ,Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import MarginalDistanceTop from '../components/MarginalDistanceTop';
const ProductFilterScreen = (props) => {
     const keyword = props.match.params.id;
    const pageNumber = props.match.params.pageNumber || 1
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;
    const [filterProducts, setFilterProducts] = useState([])
    const [filterSecondProducts, setFilterSecondProducts] = useState([])
    const [filterDropdown, setFilterDropDown] = useState('')
    const [filterSecDropdown, setFilterSecDropDown] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [subcategoryName,setSubCategoryName]=useState('')
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch, keyword, pageNumber])
    
    useEffect(() => {
        if (products && products.length >0)
        {
            const filterData=products.filter(ele=> ele.category === keyword)
            setFilterProducts(filterData)
            setFilterSecondProducts(filterData)
        }
       
    }, [products])

    useEffect(() => {
         if (filterProducts && filterDropdown)
         {
             if (!subcategoryName)
             {
                  dispatch(listProducts(keyword,filterDropdown))
             }
             if (subcategoryName)
             {
                  setFilterSecDropDown(filterDropdown)
                 }
           
        }
       
  
    }, [filterDropdown])
    useEffect(() => {
        if (subcategoryName !=="0")
        {
            const filtersub = filterSecondProducts.filter(ele => ele.subcategory.toLowerCase() === subcategoryName.toLowerCase())
            setFilterProducts(filtersub)
           
        }
       
         if (subcategoryName === "0")
         {
            
             setFilterProducts(filterSecondProducts)
            
        }
    },[subcategoryName])
    useEffect(() => {
        if (filterProducts && filterProducts.length >0)
        {   
            
           filterProductData()
        }
    }, [filterProducts])
   
    const filterProductData = () => {
        let subcategories = ([...new Set(filterSecondProducts.map(ele => ele.subcategory))])
        setSubCategoryList(subcategories)
             // console.log("format data filterArray",subcategories)
    }
    const handleSubCategoryChange = (data) => {
         setSubCategoryName(data)
       
    }
    return (
        <>
            <Meta />
          
                <Row>
                        <Col>
                            <h1 style={{marginBottom:"-20px"}}>Latest {keyword} Products</h1>
                        </Col>
                        <Col className="filter-box" style={{ display: "flex", justifyContent: "flex-end" }} md={3}>
                    
                      <Form.Control as='select' value={subcategoryName} onChange={(ele)=>handleSubCategoryChange(ele.target.value)}>
                        <option key={0} value={"0"}>Filter product category..</option>
                        {
                            subCategoryList.map((ele,i) => (
                                <option key={i} value={ele}>{ele}</option>
                            ))
                         }
                                   
                        </Form.Control>
                </Col>
                <Col className="filter-box" style={{ display: "flex", justifyContent: "flex-end" }} md={3}>
                    
                      <Form.Control as='select' value={filterDropdown} onChange={(e) => setFilterDropDown(e.target.value)}>
                         
                                <option key={0} value={"0"}>Filter products..</option>
                                <option key={1} value={"rating"}>High Rating</option>
                                <option key={2} value={"lowHighPrice"}>Price: Low to High</option>
                                <option key={3} value={"highLowPrice"}>Price: High to Low</option>
                            </Form.Control>
                        </Col>
                   </Row>
           
            <hr />
            
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :<>
                    <Row>
                        {
                           
                        filterSecDropdown && filterSecDropdown === 'lowHighPrice'? filterProducts && filterProducts.sort((a, b) => a.price - b.price).map((ele, i) => (
                                <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Product product={ele}/>
                                </Col>
                        )) : filterSecDropdown && filterSecDropdown === 'rating' ?
                            filterProducts && filterProducts.sort((a, b) => b.rating - a.rating).map((ele, i) => (
                                <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Product product={ele}/>
                                </Col>
                        ))
                        :filterSecDropdown && filterSecDropdown === 'highLowPrice'?
                            filterProducts && filterProducts.sort((a, b) => b.price - a.price).map((ele, i) => (
                                <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Product product={ele}/>
                                </Col>
                        )): filterProducts && filterProducts.map((ele, i) => (
                                <Col key={ele._id} xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Product product={ele}/>
                                </Col>
                            ))
                        }
                    
                    </Row>
                    {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword:""} /> */}
                    </>
            }
            
        </>
    )
}

export default ProductFilterScreen
