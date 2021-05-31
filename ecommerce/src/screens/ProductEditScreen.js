import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { listSingleProduct,updateProduct} from "../actions/productActions"
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import {pcategoryList} from '../data/productlist'
import axios from 'axios';



const ProductEditScreen = (props) => {
    const productId = props.match.params.id;
    const[name,setName]=useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
     const [subcategory, setSubCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail;
    const [subProductCategoryList, setSubProductCategoryList] = useState([])
    const [productCategoryList, setProductCategoryList] = useState(pcategoryList)
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;
    const [fileData, setFileData] = useState({})
    const [messages, setMessage] = useState(null)
    useEffect(() => {
       dispatch(listSingleProduct(productId)) 
    },[ props.match.params.id])
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            props.history.push('/admin/productlist')
        } else {
             if (product) {
           if (!product.name || product._id !== productId) {
           dispatch(listSingleProduct(productId)) 
        } else {
               setName(product.name)
               setBrand(product.brand)
               setDescription(product.description)
               setCategory(product.category)
               setSubCategory(product.subcategory)
               setCountInStock(product.countInStock)
               setImage(product.image)
               setPrice(product.price)
               if (product.category.toLowerCase() !== 'sample category') {
                   let pcname = productCategoryList.filter(ele => ele.pname === product.category)
                   setSubProductCategoryList(pcname[0].subProductCategory)
               }
              
        } 
        }
       }
    },[dispatch,props.history,product,productId,successUpdate])
    const submitHandler = (e) => {
        e.preventDefault()
        if (name !== '' && price   && brand !== '' && category !== '' && subcategory !== '' && description !== '') {
            dispatch(updateProduct({
                _id: productId,
                name,
                price,
                brand,
                category,
                subcategory,
                description,
                countInStock,
                image
            }))
        } else {
           
           setMessage("Please fill all the details")
        }
    }
    const uploadFileHandler = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0] // sigle file to upload because we get array
            setImage(file.name)
            setFileData(file)
        }
        
    }
    const uploadImageHandler = async() => {
       const formData = new FormData()
        formData.append('image', fileData)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const result = await axios.post('/api/upload', formData, config)
            
            setImage(result.data)
            
            setUploading(false)
        } catch (error) {
          
            setUploading(false)
        }
    }
    const handleProductCategoryChange = (name) => {
        if (name !== "0")
        {
            setCategory(name)
            let pcname = productCategoryList.filter(ele => ele.pname === name)
            setSubProductCategoryList(pcname[0].subProductCategory)
            //console.log(pcname[0].subProductCategory)
        }
       
    }
    const handleProductSubCategoryChange = (name) => {
    
        if (name !== "0") {
            setSubCategory(name)
            console.log(name)
        }
    }
    return (
        <>
            
            <Link to='/admin/productlist' className="btn btn-dark my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                
                {loadingUpdate && <Loader />}
                {messages && <Message variant='warning'>{messages}</Message>}
                {
                    errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
                }
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                           <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image} onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.File
                                id="image-file"
                                onChange={uploadFileHandler}
                                custom
                                />
                             <Button  className="btn-sm my-2" variant='primary' onClick={uploadImageHandler} >Upload</Button>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="brand">
                           <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                           <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock '
                                value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                           <Form.Label>Category</Form.Label>
                            <Form.Control as='select' value={category} onChange={(ele)=>handleProductCategoryChange(ele.target.value)}>
                            <option key={0} value={"0"}>Choose product category..</option>
                            {
                                productCategoryList.map((ele,i) => (
                                    <option key={i} value={ele.pname}>{ele.pname}</option>
                                ))
                            }
                                   
                        </Form.Control>
                            {/* <Form.Control
                                type='text'
                                placeholder='Enter category '
                                value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control> */}
                        </Form.Group>
                        <Form.Group controlId="subcategory">
                            <Form.Label>Sub Category</Form.Label>
                             <Form.Control as='select' value={subcategory} onChange={(ele)=>handleProductSubCategoryChange(ele.target.value)}>
                            <option key={0} value={"0"}>Choose sub category..</option>
                            {
                                subProductCategoryList && subProductCategoryList.map((ele,i) => (
                                    <option key={i} value={ele}>{ele}</option>
                                ))
                            }
                                   
                        </Form.Control>
                            {/* <Form.Control
                                type='text'
                                placeholder='Enter sub category '
                                value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
                            </Form.Control> */}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            
                            <Form.Control
                                as='textarea'
                                row='5'
                                placeholder='Enter description '
                                value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                       
                        <Button type="submit" className="my-2" variant='primary' >Update</Button>
                    </Form>
                }
            </FormContainer>
            </>
       
    )
}

export default ProductEditScreen;
