import React,{useState,useEffect} from 'react'
import { Item } from "../components/items/items";
import drop_down from '../components/assets/dropdown_icon.png'
import '../pages/CSS/ShopCategory.css'

export const ShopCategory = (props) => {
  const [all_product,setAll_Product] = useState([]);

  const fetchinfo = async () =>{
    await fetch('http://localhost:4000/allProducts')
    .then(res=>res.json())
    .then(data=>{setAll_Product(data)})
  }
  
  useEffect(() => {
    fetchinfo()
  },[])
  return (
    <div className="shop-category">

    {/*banner*/}
    <img className='shopcategory-banner' src={props.banner} alt="" />

    {/*Sort the products */}
    <div className="shopcategory-indexsort">
      <p>
      <span>Showing 1-12 </span>out of 36 products
      </p>
      <div className="shopcategory-sort">
      Sort By <img src={drop_down} alt="" />
      </div>
    </div>


    {/*all filtered products */}
    <div className='shopcategory-products'>
      {all_product.filter((item)=>{
          if(item.category === props.category){
           return item
          }
      }).map((item,mapsIndex)=>{
        return <Item key={mapsIndex} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                old_price={item.old_price} />
      })}
      </div>

      {/*explore more option */}
      <div className="shopcategory-loadmore">
      Explore More
      </div>

    </div>
  )
}
