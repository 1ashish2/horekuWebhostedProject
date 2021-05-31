import React, { useState } from 'react'
import { Form,Button,Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../actions/cartAction"
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import MarginalDistanceTop from '../components/MarginalDistanceTop';

const PaymentScreen = (props) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        props.history.push('/shipping')
    }
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
   
    
    const submitHandler = (e) => {
        e.preventDefault()
       // console.log({address,city,postalCode,state,country})
        dispatch(savePaymentMethod(paymentMethod))
       props.history.push('/placeorder')
    }
    return (
        <>
           
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
               
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or credit Card'
                        id='PayPal'
                        name="paymentMethod"
                        value='PayPal'
                        checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    ></Form.Check>
                     <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name="paymentMethod"
                        value='Stripe'
                       
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    </Col>
                     </Form.Group>
                <Button type="submit" varient='primary'>Continue</Button>
            </Form>
            </FormContainer>
            </>
    )
}

export default PaymentScreen

