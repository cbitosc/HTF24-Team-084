import React, { useEffect,useState} from 'react'
import '../NewCollection/NewCollection.css'
import { Item } from "../items/items";

export const NewCollection = () => {
  const [new_collections,setNew_Collections] = useState([]);

  useEffect(() => {
   fetch("http://localhost:4000/newcollections")
   .then(response=>response.json()).then(data=>setNew_Collections(data))
  },[])
  
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collections.map((item,mapsIndex) => {
                return <Item key={mapsIndex} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
