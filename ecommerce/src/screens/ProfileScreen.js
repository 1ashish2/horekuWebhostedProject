import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getUserDetail,updateUserProfile } from "../actions/userAction"
import Loader from '../components/Loader';
import Message from '../components/Message';
import {USER_UPDATE_RESET} from "../constants/userConstants"
import {orderLists} from "../actions/orderAction"
import FilterBox from '../components/FilterBox';

const ProfileScreen = (props) => {
    const[name,setName]=useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [messages, setMessage] = useState(null)
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails;

     const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

     const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;

     const orderList = useSelector(state => state.orderList)
    const { loading:loadingOrders, error:errorOrders, orders } = orderList;
    const [filterDropdown, setFilterDropdown] = useState('')
    useEffect(() => {
        setFilterDropdown('')
        dispatch(orderLists(''))
    },[])
    useEffect(() => {
        if (!userInfo)
        {
            props.history.push('/login')
        } else {
            if (user) {
                if (!user.name || success) {
                    dispatch({ type: USER_UPDATE_RESET })
                    dispatch(getUserDetail('profile'))
                    
                    dispatch(orderLists(''))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                }
            }
        }
    },[dispatch,props.history,userInfo,user,success])
    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(email)
        if (password !== confirmPassword)
        {
            setMessage('Password not matched')
        } else
        {
         // dispatch update container  
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password
            }))
        }
        
    }
    const handleFilterDropdownList = (name) => {
        setFilterDropdown(name)
        dispatch(orderLists(name))
        let dd=orders.sort((a,b)=> a.createdAt < a.createdAt?-1:1)
        console.log(dd)
       
    }
    return (
        <>
           
            <Row className='py-3 '>
            <Col md={3}>
               <h2>User Profile</h2>
            {messages && <Message variant='danger'>{messages}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile updated</Message>}
            {loading && <Loader/>}
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
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="my-2" variant='primary' >Update</Button>
            </Form>   
            </Col>
                <Col md={9}>
                    <Row>
                        <Col>
                            <h2>My orders</h2>
                        </Col>
                        <Col className="filter-box" style={{ display: "flex", justifyContent: "flex-end",marginBottom:"5px" }} md={3}>
                            <FilterBox
                                filterDropdown={filterDropdown}
                                handleFilterDropdownList={handleFilterDropdownList}
                            />
                        </Col>
                </Row>
                {
                    loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm bg-light'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       orders && orders.map(order => (
                                            <tr>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0,10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                    <i className="fas fa-times" style={{color:"red"}}></i>
                                                )}</td>
                                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                                    <i className="fas fa-times" style={{ color: " red" }}></i>}</td>
                                                <td><LinkContainer to={`/order/${order._id}`}>
                                                    <Button className="btn-sm" variant='light'>Details</Button>
                                                </LinkContainer></td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </Table>
                        )
                }
            </Col>
        </Row>
           
     </>  
    )
}

export default ProfileScreen
