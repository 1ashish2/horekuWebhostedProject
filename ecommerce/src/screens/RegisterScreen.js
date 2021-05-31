import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form,Button,Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { register } from "../actions/userAction"
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';



const RegisterScreen = (props) => {
    const[name,setName]=useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [messages, setMessage] = useState(null)
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
    
    useEffect(() => {
        if (userInfo)
        {
            props.history.push(redirect)
        }
    },[props.history,userInfo,redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(email)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (name ==='' || email ==='' || password==='')
        {
            setMessage("Fields can't be emply")
        }else
            if (re.test(String(email).toLowerCase())) {
                if (password.length > 6)
                {
                if (password !== confirmPassword)
                    {
                        setMessage('Password not matched')
                    } else
                    {
                    dispatch(register(name,email, password));  
                    }
                } else {
                     setMessage('Please enter strong password greater than 6')
                }
            
        } else {
             setMessage('Please enter valid email')
        }
        
    }
    return (
        <>
           
            <FormContainer>
            <h1>Sign Up</h1>
            {messages && <Message variant='danger'>{messages}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type="submit" className="my-2" variant='primary' >Register</Button>
            </Form>
            <Row className='py-3 '>
                <Col>
                   Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
                </Col>
            </Row>
            </FormContainer>
            </>
       
    )
}

export default RegisterScreen;
