import React, {useState, useEffect } from 'react'
import { Table,Button,Row,Col,Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { listProducts,deleteProduct,createProduct} from "../actions/productActions"
import Loader from '../components/Loader';
import Message from '../components/Message';
import {LinkContainer} from 'react-router-bootstrap'
import {PRODUCT_CREATE_RESET} from "../constants/productConstants"
import Paginate from '../components/Paginate';

const ProductListScreen = (props) => {
    const pageNumber= props.match.params.pageNumber || 1
      const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products,page,pages } = productList;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const deleteProductDetail = useSelector(state => state.deleteProductDetail)
    const { loading:deleteLoading,success:deleteSuccess,error:deleteError } = deleteProductDetail;

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate,success:successCreate,error:errorCreate,product:createdProduct } = productCreate;
    const [filterDropdown, setFilterDropdown] = useState('')
    const [productCat, setProductCat] = useState([])
    const [filterProductList, setFilterProductList] = useState([])
    const [filterSecProductList, setFilterSecProductList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const[filterSubDropdown,setFilterSubDropdown]=useState('')
    useEffect(() => {
        setFilterDropdown('')
       setFilterSubDropdown('')
   },[])
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        // if (userInfo && userInfo.isAdmin ) {
        //     dispatch(listProducts())
        // } else {
        //     props.history.push('/login')
        // }
        
        if(!userInfo.isAdmin)
        {
            props.history.push('/login')
        }
        if (successCreate)
        {
            props.history.push(`/admin/product/${createdProduct._id}/edit`)
        } else
        {
            dispatch(listProducts('',pageNumber))
            }
        
    }, [dispatch, props.history, userInfo, deleteSuccess, successCreate, createdProduct, pageNumber])
    useEffect(() => {
        if (products && products.length > 0) {
            let categories = ([...new Set(products.map(ele => ele.category))])
            setProductCat(categories)
            console.log("cat in plist", categories)
        }
    },[products])
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete the user'))
        {
            //delete product
           dispatch(deleteProduct(id))
        }       
        
    }
    const createProductHandler = () => {
       dispatch(createProduct())
    }
    
    const handleFilterDropdownList = (name) => {
        setFilterDropdown(name)
        
    }
    
    useEffect(() => {
        if (filterDropdown && !filterSubDropdown)
        { 
            const filterData = products.filter(ele => ele.category === filterDropdown)
            setFilterProductList(filterData)
            setFilterSecProductList(filterData)
            let subcategories = ([...new Set(filterData.map(ele => ele.subcategory))])
            setSubCategoryList(subcategories)
            // console.log(subcategories)
            // console.log(filterData)
        } 
          
    }, [filterDropdown])
    const handleFilterSubDropdownList = (name) => {
        setFilterSubDropdown(name)
       // console.log(name)
    }
    useEffect(() => {
        if (filterSubDropdown)
        {
            const filterData = filterSecProductList.filter(ele => ele.subcategory === filterSubDropdown)
           setFilterProductList(filterData)
        }
  },[filterSubDropdown])
    return (
        <>
           
            <Row className="align-items-center ">
                <Col sm={12} md={4} lg={4}>
                     <Button className="my-3  " onClick={createProductHandler}>
                       <i className="fas fa-plus"></i> Create Product
                    </Button>
                    
                </Col>
                <Col sm={12} md={4} lg={4} className="mb-2">
                    <Form>
                    <Form.Control as='select' value={filterDropdown} onChange={(e) => handleFilterDropdownList(e.target.value)}>
                            <option key={0} value={"0"}>Filter Product..</option>
                            {
                               productCat && productCat.length>0&& productCat.map((ele, i) => (
                                    <option key={i} value={ele}>{ele}</option>
                                ))
                            }
                               
                               
                        </Form.Control>
                        </Form>
                </Col>
                <Col sm={12} md={4} lg={4} className="mb-2">
                    <Form>
                    <Form.Control as='select' value={filterSubDropdown} onChange={(e) => handleFilterSubDropdownList(e.target.value)}>
                            <option key={0} value={"0"}>Filter Sub Product..</option>
                            {
                               subCategoryList && subCategoryList.length>0&& subCategoryList.map((ele, i) => (
                                    <option key={i} value={ele}>{ele}</option>
                                ))
                            }
                               
                               
                        </Form.Control>
                        </Form>
                </Col>
                
            </Row>
            <Row>
                <Col sm={12} md={3} lg={3}  >
                   <h1>Products</h1>
                </Col>
            </Row>
            {/* {deleteLoading && <Loader />} */}
            {deleteError && <Message variant="warning">{deleteError}</Message>}
             {loadingCreate && <Loader />}
             {errorCreate && <Message variant="warning">{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                ( <>
                    <Table striped bordered hover responsive className='table-sm bg-light'>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>NAME</td>
                                <td>PRICE</td> 
                                <td>CATEGORY</td>
                                <td>PRODUCT</td>
                                <td>BRAND</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterProductList && filterProductList.length > 0 ? filterProductList.map(
                                    product => (
                                    <tr  key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td><i className="fas fa-rupee-sign"></i>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{product.brand}</td>
                                        
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                                    : products && products.map(product => (
                                    <tr  key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td><i className="fas fa-rupee-sign"></i>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{product.brand}</td>
                                        
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />

                    </>
            )
            
            }
        </>
    )
}

export default ProductListScreen
