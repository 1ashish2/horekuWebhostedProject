import React from 'react'
import { Container, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer-distributed ">
            <Row>
                
                <Col className="footer-left" xs={12} sm={12}>
        
                <Image src="/images/myshop.png" alt="image" style={{width:"8rem",height:"3rem"}} fluid rounded/>
        
                <p className="footer-links">
                  <Link to="/" className="link-1"> <i className="fas fa-home"> </i> Home</Link>
                  
                  <Link to="/about"> <i className="fas fa-address-book"> </i> About</Link>
                
                  <Link to="/cart">
                                <i className="fas fa-shopping-cart"> </i> Cart
                    </Link>
                  
                  
                </p>
                <div className="footer-icons">
                  <a href="https://www.linkedin.com/in/ashish-kumar-090991145/"><i className="fab fa-linkedin "></i></a>
                  <a href="https://github.com/1ashish2"><i className="fab fa-github "></i></a>
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  
                </div>
                
              </Col>
    
                  <Col className="footer-center" xs={12} sm={12}>
        
                <div >
                  <i className="fa fa-map-marker"></i>
                  <p> Bihar, India 845401</p>
                </div>
        
                <div>
                  <i className="fa fa-phone"></i>
                  <p>+91 8608608600</p>
                </div>
        
                <div>
                  <i className="fa fa-envelope "></i>
                  <p><a href="mailto:support@company.com">myshop@company.com</a></p>
                </div>
        
            
        
                </Col>
               
                 <Col className="footer-right" xs={12} sm={12}>
                <p className="footer-company-about">
                  <span>About the company</span>
                  MyShop is online ecommerce platform which help the customer to buy or sell the product.
                </p>
                    <div className="footer-icons">
                        <p className="footer-company-name">Created by Ashish Kumar © 2021</p>
              
                    </div>    
              
                </Col>
                
            </Row>
           
             
             
              
        
           
        </footer>
    )
}

export default Footer
