import React, { useState,useEffect } from 'react'
import { Form, Button } from "react-bootstrap"


const SearchBox = ({props}) => {
    const [keyWord, setKeyWord] = useState('')
    
    useEffect(() => {
        setKeyWord('')    
    },[])
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord.trim())
        {
            props.history.push(`/search/${keyWord}`)
        } else {
            props.history.push('/')
        }
       
    }
    return (
        
        <Form onSubmit={submitHandler} className={`d-flex  justify-content-between search-box`}>
               <Form.Control
                type="text"
                placeholder="search product..."
                onChange={(e) => setKeyWord(e.target.value)}
                className="mr-sm-2 ml-sm-5  "
                style={{border:"1px solid black"}}
                >
            </Form.Control>
            
                <Button type="submit" variant="outline-dark" className="p-2 text-light w-25 " ><i className="fas fa-search text-danger" aria-hidden="true"></i></Button>
         
            </Form>
         
    )
}

export default SearchBox
