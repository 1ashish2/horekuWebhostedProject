import React from 'react'
import { Form} from 'react-bootstrap';
const FilterBox = ({ filterDropdown, handleFilterDropdownList }) => {
    const handleFilterDropdown = (name) => {
        handleFilterDropdownList(name)
    }
    return (
        <Form.Control as='select' value={filterDropdown} onChange={(e) => handleFilterDropdown(e.target.value)}>
                         
                                <option key={0} value={"0"}>Filter Lists..</option>
                                <option key={1} value={"date"}>By Date</option>
                                <option key={2} value={"paid"}>By Paid</option>
                                <option key={3} value={"deliver"}>By Delivered</option>
        </Form.Control>
    )
}

export default FilterBox
