import React,{useEffect, useState} from 'react'
import '../RelatedProducts/RelatedProduct.css'
import {Item} from '../items/items'

export const RelatedProducts = (props) => {
  const {product} = props
  const [relatedProducts,setRelatedProducts] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/getrelatedproductcategorywise",{
        method:'POST',
        headers:{
          Accept:"application/json",
          'Content-type':"application/json",
        },
        body:JSON.stringify({category:product.category})
    }) .then(response=>response.json()).then(data=>{setRelatedProducts(data);console.log(data)})
},[])

  return (
    <div className='relatedproducts'>
        <h1>Related Products
            <hr />
        </h1>
        <div className="relatedproducts-item">
            {relatedProducts.map((item,mapsIndex)=>{
                return <Item key={mapsIndex} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
