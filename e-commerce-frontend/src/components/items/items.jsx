import React from 'react'
import '../items/items.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
    {/* note here there should be /Product and not just Product as / tells that there can be anything before
    the product address as well.
    USE this only in to not path */}
        <Link to={`/Product/${props.id}`} ><img src={props.image} alt="" onClick={window.scroll(0,0)}/></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">${props.new_price}</div>
            <div className="item-price-old">${props.old_price}</div>
        </div>
    </div>
  )
}
