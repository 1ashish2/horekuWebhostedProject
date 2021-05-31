import React, { useEffect,useState } from 'react'
import { Table,Button,Row,Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { allOrderList } from "../actions/orderAction"
import Loader from '../components/Loader';
import Message from '../components/Message';
import {LinkContainer} from 'react-router-bootstrap'
import FilterBox from '../components/FilterBox';


const OrderListScreen = (props) => {
      const dispatch = useDispatch();
    const allOrders = useSelector(state => state.allOrders)
    const { loading, error, orders } = allOrders;
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const [filterDropdown, setFilterDropdown] = useState('')
    
    useEffect(() => {
      setFilterDropdown('')
  },[])
    useEffect(() => {
        
        if (userInfo && userInfo.isAdmin) {
            dispatch(allOrderList())
        } else {
            props.history.push('/login')
        }
        
    }, [dispatch, props.history, userInfo])
    
    const handleFilterDropdownList = (name) => {
        setFilterDropdown(name)
        dispatch(allOrderList(name))
       
       
    } 
    return (
        <>
            
           
                <Row>
                        <Col>
                            <h2>Orders</h2>
                        </Col>
                        <Col className="filter-box" style={{ display: "flex", justifyContent: "flex-end",marginBottom:"5px" }} md={3}>
                           
                             <FilterBox
                                filterDropdown={filterDropdown}
                                handleFilterDropdownList={handleFilterDropdownList}
                            />
                        </Col>
           </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm bg-light'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
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
                                    <tr  key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                         <td><i className="fas fa-rupee-sign"></i>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10)
                                        :<i className="fas fa-times" style={{color:"red"}}></i>
                                        }</td>

                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10)
                                        :<i className="fas fa-times" style={{color:"red"}}></i>
                                        }</td>
    
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light" className="btn-sm">
                                                   Details
                                                </Button>
                                            </LinkContainer>
                                            
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
            )
            
            }
        </>
    )
}

export default OrderListScreen
