import React from 'react'
import {Helmet} from "react-helmet"
const Meta = ({title,description,keyword}) => {
    return (
         <Helmet>
                <title>{title} </title>
                <meta name='description' content={description} />
                 <meta name='keywords' content={keyword} />

            </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to MyShop",
    description: 'we sell the best products for cheap',
    keyword:'electronics, buy electronics, cheap electronics'
}

export default Meta
