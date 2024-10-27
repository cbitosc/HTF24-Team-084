import React from 'react'
import '../pages/CSS/LoginSignUp.css'
import { useState } from 'react'

export const LoginSignUp = () => {

  const [state,setState] = useState("Login")

  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })

  const login = async ()=>{
    console.log("login",formData)
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
    }).then((resp)=>resp.json()).then((data)=>{responseData = data})

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }



  const signup = async ()=>{
    console.log("sign in",formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
    }).then((resp)=>resp.json()).then((data)=>{responseData = data})

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
        {state ==="Sign Up" && <input name="username" value = {formData.username} onChange={handleChange} type="text" placeholder='Your Name' />}
        <input name="email" value = {formData.email} onChange={handleChange} type="email" placeholder='Email Address'/>
        <input type="password" name="password" value = {formData.password} onChange={handleChange}  placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Sign Up"?signup():login()}}>Continue</button>
        {state === "Login"?<p className="loginsignup-login">Don't Have An Acount <span onClick={()=>{setState("Sign Up")}}>Sign Up</span></p>:<p className="loginsignup-login">Already Have An Acount <span onClick={()=>{setState("Login")}}>Log In</span></p>}
          <div className="loginsignup-agree">
          {state === "Sign Up" && <input type="checkbox" name='' id='' />}
          {state === "Sign Up" &&<p>By Continuing,I agree to the terms and conditions mentioned</p>}
          </div>
        </div>
    </div>
  )
}
