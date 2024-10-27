import React, { useContext, useEffect, useState} from 'react'
import '../ProductDisplay/ProductDisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../../ShopContext/ShopContext'

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada blandit neque id dictum. Quisque consectetur ac leo eget faucibus. In pharetra vel eros ut imperdiet. Quisque in congue justo. Fusce dapibus varius mi eget elementum. Morbi eu metus accumsan, condimentum eros vel, sagittis neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla at nibh est. Ut vitae libero egestas, dignissim orci id, efficitur odio. Nam diam lorem, maximus non auctor suscipit, porttitor id diam. Curabitur a est posuere, tristique mi id, malesuada arcu. Nunc ut neque purus. Sed at suscipit risus. Nullam a cursus augue. Etiam ut neque placerat, aliquet ex a, varius neque.";

export const ProductDisplay = (props) => {
    const {product} = props
    const [quantity,setQuantity] = useState(Number(1));
    const Address = useLocation();
    //method to extract previous value without using the hook predefined function
    const [page,setPage]=useState(Address.pathname);
    const [oldpage,setOldPage] = useState(page);
    


    
    const {addToCart,cartItems} = useContext(ShopContext);

/*     useEffect(() => {
        setCartItems((getDefaultCart()))
       },[])*/
     useEffect(()=>{
        console.log(cartItems)
     },[cartItems])   

   useEffect(() => {
      setOldPage(page);
      setPage(Address.pathname);
      if(oldpage){
       setQuantity(1);
    }
    }, [Address.pathname])
    
    
    //Add to cart inside these functions and not inside click me of add to cart button as 
    //quantity is regularly being updated for the + and - until the last value
    //and last value is also being updated for manual.

    const SetAmountManual = (e)=>{
       /* 1. */ setQuantity(
        /* the condition allows the input box to not contain 0 or Nan error when manually typing ,use */
        (e.target.value)<1 || isNaN(e.target.value) ? Number(1) :  Number(e.target.value));


       
    }

    const SetAmountMinus =  (e) => {
        /* 1. */ quantity<=Number(1)?setQuantity(Number(1)):setQuantity(quantity-Number(1));

     
    }

    const SetAmountPlus = (e)=> {
        /* 1. */ setQuantity(quantity+Number(1));
        
        
    }
     
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img src={product.image} alt="" className="productdisplay-main-img" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name.substring(0, 60) + "..."}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price*quantity}</div>
            </div>
            <div className="productdisplay-right-description">{description.substring(0,50) + "..."}</div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
            </div>
            <div className="productdisplay-right-quantity">
                <h1>Select Quantity</h1>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default" /* call the function here when clicked not calling a function when setquantity is called*/ onClick={SetAmountMinus}>-</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='' value={quantity} onChange={SetAmountManual} />
                    <span className="input-group-text" id="inputGroup-sizing-default" /* call the function here when clicked not calling a function when setquantity is called*/ onClick={SetAmountPlus}>+</span>
                </div>
                <br />
            </div>
        <button onClick={()=>{addToCart(product.id,quantity);}}>Add To Cart</button>
        <p className="productdisplay-right-category"><span>Category: </span> Women,T-Shirt,Crop-Top</p>
        <p className="productdisplay-right-category"><span>Tags: </span> Modern,Latest</p>
        </div>
    </div>
  )
}


