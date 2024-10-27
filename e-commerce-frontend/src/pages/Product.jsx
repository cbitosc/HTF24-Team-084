import React,{useState,useEffect} from 'react'
import all_product from '../components/assets/all_product'
import { useParams } from 'react-router-dom'
import { BreadCrumb } from '../components/BreadCrumb/BreadCrumb';
import { ProductDisplay } from '../components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../components/RelatedProducts/RelatedProducts';



export const Product = () => {

/*     const [all_products,setAll_Product] = useState([]);

  const fetchinfo = async () =>{
    await fetch('http://localhost:4000/allProducts')
    .then(res=>res.json())
    .then(data=>{setAll_Product(data);console.log(data)})
  }
  
  useEffect(() => {
    fetchinfo()
    console.log("data:",all_product)
  },[])   */

  const {ProductId} = useParams();
  const product = all_product.find((e)=>
   e.id === Number(ProductId)
  )
  console.log(product)


  return (
    <div> 
    <BreadCrumb product={product} />
    <ProductDisplay product={product} />
    <DescriptionBox />
    <RelatedProducts product={product}/>
    </div>
  )
}
