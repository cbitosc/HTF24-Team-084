import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage] = useState(false)

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        old_price:"",
        new_price:""
    })

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_product = async ()=>{
        let responseData;
        let product = productDetails;
        let formData = new FormData()
        formData.append('product',image)
        
    
        //will send the image to the upload folder in backend then save it in database also using then 
        //we can show data in frontend
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData = data;console.log(data)})

        if(responseData.success){
            product.image=responseData.image_url
            console.log(product)
            //goes to backend addProduct not admin addProduct
            await fetch('http://localhost:4000/addProduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{data.success?alert("ok"):alert("not ok")})
        }
    }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input  value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type Here" />
            </div>         
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input  value={productDetails.new_price} onChange={changeHandler}type="text" name="new_price" placeholder="Type Here" />
        </div>
        </div>
   
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name="category" className='addproduct-selector'  value={productDetails.category} onChange={changeHandler}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className="addproduct-thumbnail-img" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={()=>{Add_product()}}className="addproduct-btn">Add</button>
    </div>
  )
}

export default AddProduct