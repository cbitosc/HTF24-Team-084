import React, { useContext, useState, useRef} from 'react'
import './navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../ShopContext/ShopContext'
import nav_dropdown from '../assets/dropdown_icon.png'


export const Navbar = () => {
    const {getTotalCartQuantity} = useContext(ShopContext);
    const [menu,setMenu] = useState("Shop");   
    const menuref = useRef()
    const dropdown_toggle = (e)=>{
      menuref.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>

        <div className='nav-logo'>
            <img src={logo} />
            <p>SHOPPER</p>
       </div>
       <img class="nav_dropdown" onClick = {dropdown_toggle} src={nav_dropdown} alt="" />
       <ul ref={menuref} className="nav-menu">
            <li onClick={(e)=>{ setMenu(e.target.outerText)}}><Link style={{textDecoration:'none'}} to="/">Shop{menu =="Shop"?<hr />:<></>}</Link></li>
            <li onClick={(e)=>{ setMenu(e.target.outerText)}}><Link style={{textDecoration:'none'}} to="/men">Men{menu =="men"?<hr />:<></>}</Link></li>
            <li onClick={(e)=>{ setMenu(e.target.outerText)}}><Link style={{textDecoration:'none'}} to="/women">Women{menu =="women"?<hr />:<></>}</Link></li>
            <li onClick={(e)=>{ setMenu(e.target.outerText)}}><Link style={{textDecoration:'none'}} to="/kid">Kids{menu =="kid"?<hr />:<></>}</Link></li>   
            </ul>
       <div className='nav-login-cart'>
       {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to="/Login"><button>Login</button></Link>}
       <Link to="/Cart"><img src={cart_icon} /></Link>
       <div className="nav-cart-count">
        {getTotalCartQuantity()}
       </div>
       </div>

    </div>
  )
}
