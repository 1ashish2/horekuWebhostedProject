import React from 'react'
import {Route} from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import {Nav,Navbar,NavDropdown,Container,Image} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { logout } from "../actions/userAction"
import SearchBox from './SearchBox';
const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch=useDispatch()
    const logoutHandler = () => {
       dispatch(logout())
    }
    return (
      
        <header >
           
            <Navbar bg="light"  variant="dark" expand="lg" collapseOnSelect fixed="top">
                <Container>
                    <LinkContainer to="/">
                         <Navbar.Brand > <Image src="/images/myshop.png" alt="image" style={{width:"8rem",height:"3rem"}} fluid rounded/></Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/cart" className="d-md-block d-lg-none d-xl-none">
                                <Nav.Link className="cart-icon"><i className="fas fa-shopping-cart"> </i> Cart</Nav.Link>
                            </LinkContainer>
                    {/* <LinkContainer to="/main">
                         <Navbar.Brand >Main Page</Navbar.Brand>
                    </LinkContainer> */}
                
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* making it raoutable because it doesn't have history */}
                    <div className="d-none d-sm-none d-lg-block ">
                    <Route render={(props) => <SearchBox props={props} />} />
                    </div>
                    
                    
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                       
                           
                        <Nav className="ml-auto " >
                             <LinkContainer to="/about">
                                <Nav.Link className="text-dark"><i className="fa fa-address-book"> </i> About</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart" className="d-xs-none d-sm-none d-md-block d-lg-block d-xl-block">
                                <Nav.Link className="cart text-dark"><i className="fas fa-shopping-cart"> </i> Cart</Nav.Link>
                            </LinkContainer>
                             {userInfo ? (
                                <NavDropdown  title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item  >Profile</NavDropdown.Item>
                                    </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                              </NavDropdown>
                                ): <LinkContainer to="/login">
                                 <Nav.Link className="text-dark"><i className="fas fa-user "> </i> Sign In</Nav.Link>
                            </LinkContainer>
                              }
                           
                         {userInfo && userInfo.isAdmin && (<NavDropdown title={'Admin'} id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item >Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                              
                            </NavDropdown>)}
                            
           
            </Nav>
                    </Navbar.Collapse>
                   
                    
                </Container>
                
            </Navbar>
            
        
            </header>
            
         
    )
}

export default Header
