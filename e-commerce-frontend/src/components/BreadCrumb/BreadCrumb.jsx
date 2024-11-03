import React from 'react'
import '../BreadCrumb/BreadCrumb.css'
import arrow_icon from '../assets/breadcrum_arrow.png' 

export const BreadCrumb = (props) => {
    const {product} = props
  return (
    <div className='breadcrumb'>
        HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}
