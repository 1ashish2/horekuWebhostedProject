import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, Form } from "react-bootstrap";
import Rating from '../components/Rating';
import { useDispatch, useSelector } from "react-redux"
import { listSingleProduct,createProductReview } from "../actions/productActions"
import Loader from '../components/Loader';
import Message from '../components/Message';
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Meta from '../components/Meta';


const ProductScreen = (props) => {
    //const product = products.find((p => p._id === props.match.params.id))
    const dispatch = useDispatch();
    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview , error: errorProductReview , success: successProductReview  } = productReviewCreate;
    
    const [qty, setQty] = useState(1)
    const[rating,setRating]=useState(0)
    const [comment, setComment] = useState('')
    useEffect(() => {
        dispatch(listSingleProduct(props.match.params.id))
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }, [props.match.params.id])
    useEffect(() => {
        dispatch(listSingleProduct(props.match.params.id))
        if (successProductReview)
        {
            alert('Review Submitted')
            setComment('')
            setRating(0)
        }
    }, [dispatch,successProductReview])
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(props.match.params.id, {
            rating,
            comment
        }))
       
  
  }
    return (
        <>
           
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <>
                        <Meta title={product.name}/>
                <Row>
                <Col sm={12} md={6} lg={6}>
                        <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3} >
                    <ListGroup variant="flush" >
                        <ListGroup.Item className="list-product-screen" >
                            <h3>{ product.name}</h3>
                        </ListGroup.Item>
                          <ListGroup.Item className="list-product-screen">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-product-screen">
                           Brand: {product.brand ?product.brand.toUpperCase():null}
                        </ListGroup.Item>
                          <ListGroup.Item className="list-product-screen">
                           Price: <i className="fas fa-rupee-sign"></i>{product.price}
                        </ListGroup.Item>
                          <ListGroup.Item className="list-product-screen">
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                          <ListGroup >
                              <ListGroup.Item className="list-product-screen">
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong><i className="fas fa-rupee-sign"></i>{product.price}</strong>
                                    </Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-product-screen">
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                       {product.countInStock >0 ?"In Stock":"Out of Stock"}
                                    </Col>
                            </Row>
                                </ListGroup.Item>
                                {
                                    product.countInStock > 0 && (
                                        <ListGroup.Item className="list-product-screen">
                                            <Row>
                                                <Col>
                                                    Qty
                                                </Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => {
                                                    setQty(e.target.value)
                                                }}>
                                                   { [...Array(product.countInStock).keys()].map((x) =>(
                                                     <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                   ))
                                                    }
                                                </Form.Control>
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    )
                            }
                            <ListGroup.Item className="list-product-screen">
                                <Row>
                                <Button className="btn-block " type="button" onClick={addToCartHandler} disabled={product.countInStock ===0}>
                                        Add to Cart
                                </Button>
                                </Row>
                        </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                </Row>
                    <Row>
                    <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews && product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>Reviewer : {review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>Review At : {review.createdAt.substring(0, 10)}</p>
                                            <p>Comments : {review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                {loadingProductReview && <Loader />}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {
                                        userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                            <Form.Group className="my-2" id="rating">
                                                <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select'
                                                        value={rating} onChange={(e) => setRating(e.target.value)}>
                                                         <option key={0} value={0}>select rating</option>
                                                        <option key={1} value={1}>1 - Poor</option>
                                                        <option key={2} value={2}>2 - Fair</option>
                                                        <option key={3} value={3}>3 - Good</option>
                                                        <option key={4} value={4}>4 - Very Good</option>
                                                        <option key={5} value={5}>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="my-2">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                    placeholder='Enter comment'
                                                    value={comment} onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                                </Form.Group>
                                                <Row>
                                                    <Button type="submit"  className=" my-2" variant='primary'  >Add comment</Button>
                                                </Row>
                                            </Form>)
                                            : <Message >Please <Link to="/login">Sign in</Link> to write a review</Message>
                                    }
                                </ListGroup.Item>
                    </Col>
                    </Row>
                </>
                )
            }
                  </>
    )
}

export default ProductScreen
