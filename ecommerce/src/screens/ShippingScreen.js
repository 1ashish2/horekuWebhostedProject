import React, { useState } from 'react'
import { Form,Button,Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartAction"
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = (props) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const[city,setCity]=useState(shippingAddress.city)
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [state, setStates] = useState(shippingAddress.state)
    
    const submitHandler = (e) => {
        e.preventDefault()
       
        dispatch(saveShippingAddress({address,city,postalCode,state,country}))
       props.history.push('/payment')
    }
    return (
        <>
        
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        required
                        value={address} onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        required
                        value={city} onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postalCode'
                        required
                        value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter state'
                        required
                        value={state} onChange={(e) => setStates(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        required
                        value={country} onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" varient='primary'>Continue</Button>
            </Form>
            </FormContainer>
            </>
    )
}

export default ShippingScreen
