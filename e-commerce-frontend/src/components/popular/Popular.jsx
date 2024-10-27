import React, { useState,useEffect} from 'react'
import './Popular.css'
import {Item} from '../items/items'

export const Popular = () => {
  const [popularinwomen,setpopularinwomen] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
    .then(response=>response.json()).then(data=>setpopularinwomen(data))
   },[])

  return (
    <div className='popular'>
        <h1>
       POPULAR IN WOMEN
        </h1>
        <hr />
        <div className="popular-item">
            {popularinwomen.map((item,mapsIndex)=>{
                return <Item key={mapsIndex} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
