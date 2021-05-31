import React from 'react'
import { Card,Button,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card className="my-1 p-1 rounded" >
            <Row>
                <Col md={5} sm={4} xs={5} lg={5}>
                     <Link to={`/product/${product._id}`} >
                
                        <Card.Img src={product.image} variant="top" fluid style={{width:"14rem", height: '12rem' }}/>
                    
                    </Link>
                </Col>
                <Col sm={8} md={7} xs={7} lg={7}>
                     <Card.Body>
                
                <Link to={`/product/${product._id}`}  >
                     <Card.Title as="h5" >
                        <strong >{product.name.length >40?product.name.substring(0,40)+"...":product.name}</strong>
                         </Card.Title>
                </Link>
               
                <Card.Text as="h6">
                    <div className="my-1 d-flex">
                    <div>
                        By {product.brand}
                    </div>
                    
                    </div>
                </Card.Text>
                <Card.Text as="div">
            <div className="my-1 d-flex">
              <div className="product-rating">{product.rating}*</div><div>{product.numReviews >1?product.numReviews+" reviews":product.numReviews+" review"}</div>
                        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`}/> */}
              </div>
            </Card.Text>
                <Card.Text as="h4">
                <div className="my-1">
                  <i className="fas fa-rupee-sign"></i>{product.price}
              </div>
            </Card.Text>
               
             <Card.Text as="div" >
            <Link to={`/product/${product._id}`}  >
                  <span className="text-info">View Details</span> 
            </Link>
            </Card.Text>
            </Card.Body>
           
                </Col>

            </Row>
            
            
        </Card>
    )
}

export default Product
