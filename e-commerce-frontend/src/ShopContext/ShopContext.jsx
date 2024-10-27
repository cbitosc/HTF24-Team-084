import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

export const getDefaultCart = ()=>{
    let cart = {};
    for(let i=0;i<300+1;i++){
       cart[i]=0;
    }
   return cart;
   }

export const ShopContextProvider = (props) =>{
    const [all_product,setAll_Product] = useState([])
    const [cartItems,setCartItems] = useState(getDefaultCart());
    //if we use this we have to add setamount personally to all components that change quantity
    //instead we want to change display with respect to change in quantity not wrt occurring of a event.
    /* const [amount,setAmount] = useState(0); */

    useEffect(() => {
       fetch('http://localhost:4000/allProducts')
      .then(response=>response.json())
      .then(data=>setAll_Product(data))

      if(localStorage.getItem("auth-token")){
        fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
                Accept:"application/form-data",
                'auth-token':`${localStorage.getItem("auth-token")}`,
                'Content-type':"application/json",
            },
            body:""
            }).then(res=>res.json())
            .then(data=>{setCartItems(data)})
    }
    }, [])
    
   
    const addToCart=(itemId,quantity)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+quantity}))
        if(localStorage.getItem("auth-token")){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-type':"application/json",
                },
                body:JSON.stringify({"itemId":itemId,"quantity":quantity})
                }).then(res=>res.json())
                .then(data=>{console.log(data)})
        }
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem("auth-token")){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-type':"application/json",
                },
                body:JSON.stringify({"itemId":itemId})
                }).then(res=>res.json())
                .then(data=>{console.log(data)})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        //if we use total quantity method we are only updating value when we go to cart page not when we click add to cart
        //use a funtion to setamount so that the amount is not set statically and set every time when the funtion is caled which is when the button is clicked.
        /* let totalQuantity = 0; */
        for(/* let item=0;item<all_product.length;item++ */ /* use the count based loop or iterate through each value in cartitems object */
            const item in cartItems){
            console.log("items:",[item]) 
            if(cartItems[item]!=(0)){
                /* totalQuantity+=Number(cartItems[item]) */
                let itemInfo = all_product.find((product)=>(product.id) === Number(item))/* .find((product)=>(product.id) === Number(item)) */;
                console.log("iteminfo",itemInfo)
                    totalAmount +=  itemInfo.new_price * cartItems[item] ;
            }
        }   
       /*  setAmount(totalQuantity); */
        return totalAmount;
        }
    const getTotalCartQuantity = ()=>{
        let amount=0;
        for(const item in cartItems){
            if(cartItems[item]!=(0)){
                amount+=cartItems[item];
            }
        } 
        return amount 
    }
    
    
    const contextValue = {all_product,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartQuantity};
    
    return (<ShopContext.Provider value={contextValue}>
            {/* props.children are all the elements that are going to use the contextValue
            and is not the contextValue */}
            {props.children}
        </ShopContext.Provider>)
}

