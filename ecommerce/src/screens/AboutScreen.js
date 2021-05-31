import React from 'react'
import { Col,  Row ,Image} from 'react-bootstrap';
const AboutScreen = () => {
    return (
        <>
           
        <div className="container mt-4 mb-2 profile-page" >
        <Row >
            <Col className=" pt-3" md={4} lg={4} sm={12} xs={12}>
                <Image src="/images/mydeveloper.png" alt="New York" fluid />
            </Col>
                    <Col md={8} lg={8} sm={12} xs={12}>
                        <Row className="mt-3 text-dark" style={{fontSize:"18px"}}>
                            <h3>About Me</h3>
                                <p className="aboutLine">
                                        Hi, I am Ashish Kumar
                        <p> I have just over a year of experience as a Web Developer with "ReactJs" Technology who constantly seeks out innovative solutions to everyday problems with my analytical thinking and collaboration skills.
                            </p>
                                <p><span style={{ fontSize: "20px" }}>Project Detail:</span> It is an E-commerce project where we have two types of user:<br/>
                                    1) General user 2)Admin User<br/>
                                    There is an Authentication for a user where the user needs to sign in or SignUp to checkout and place the order.<br/>
                                    In the general user, section users can search the product, view the product, filter the product category, add the product to the cart, and check out the product as well. On the view product page, the user can give the rating to the product and checkout the product.<br/>
                                    There are four steps to complete the order<br/> 1) SignIn 2) Address 3) Payment 4)place order<br/>
                                    For Admin there are three sections where Admin can<br/>
                                    1) Maintain Login Userlist where Admin can edit, delete and update user<br/>
                                    2) Maintain the products where Admin can Add, Update, Delete the product<br/>
                                    3) Maintain Orderslist where Admin can view the ordered product and check product paid status and able to mark the order as delivered
                                    </p>
                            </p>
                           
                            <p ><span style={{fontSize:"20px"}}>Technology used in Project:</span><br/>
                            <span style={{fontWeight:"bold"}}>FrontEnd:</span> Reactjs, Redux, BootStrap, CSS3 and HTML5<br />
                            <span style={{fontWeight:"bold"}}>Other libraries used in FrontEnd:</span> ReactHelmet, ReduxThunk , ReactRouterBootstrap, ReactBootstrap, React PaypalButton v2<br/>
                            <span style={{fontWeight:"bold"}}>BackEnd :</span>  ExpressJs,NodeJs and MongoDB cloud cluster<br />
                            <span style={{fontWeight:"bold"}}>Other libraries used in Backend:</span>  DotEnv, JsonWebToken, Morgan, Multer, Concurrently, Nodemon, Mongoose, ExpressAsyncHandler, Bcryptjs
                            </p>
                        </Row>
                        <Row >
                            
                            <h4>
                                Social Media Link
                            </h4>
                            <hr />
                            <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                                <a href="https://github.com/1ashish2">
                                     <i class="fab fa-github"></i> Github
                                </a>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                                <a href="https://www.linkedin.com/in/ashish-kumar-090991145/">
                                <i class="fab fa-linkedin-in text-info" aria-hidden="true"></i>  LinkedIn
                                </a>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                                <a href="#">
                                    <i class="fab fa-twitter text-info"></i> Twitter
                                </a>
                              
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                                <a href="#">
                                    <i class="fab fa-facebook-square text-info"></i> Facebook
                                 </a>
                            </Col>
                            
                        </Row>
            
            </Col>
        
        </Row>
        </div>
    </>
)
}

export default AboutScreen
