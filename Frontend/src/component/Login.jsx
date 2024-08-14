import React, { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant.jsx'
import  {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {getUser} from "../redux/userSlice.jsx"




const Login = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const loginSignupHandler = ()=>{
    setIsLogin(!isLogin)
  }


  const submitHandler =async (e)=>{
    e.preventDefault()
    // console.log(name, username, email, password);


    if(isLogin){ //Login...

      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {email, password},{
          headers :{
            'Content-Type' : 'application/json'
          },
          withCredentials : true
      })
        console.log(res);
        
        dispatch(getUser(res.data.user))

        if(res.data.success){
          navigate("/")
          toast.success(res.data.message)
        }

      } 
      catch (err) {
        toast.success(err.response.data.message) 
        console.log(err);
      }


    }



    else{ //Singup...

      try {
        let res = await axios.post(`${USER_API_END_POINT}/register`, {name, username, email, password},{
          headers :{
            'Content-Type' : 'application/json'
          },
          withCredentials : true
        })
        // console.log(res);

        if(res.data.success){
          setIsLogin(true)
          toast.success(res.data.message)
        }
        

      } 


      catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }


    }

  }


  

  return (
    <div className='w-screen h-screen'>


        <div className='w-full h-full flex items-center justify-center gap-[7vw]  '>


            <img  className='w-[20%] object-cover' src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="" />


          <form onSubmit={submitHandler} className='flex flex-col '>
            <h1 className='text-[4vw] font-bold mb-5 '>Happening Now.</h1>

            <h1 className='font-black mb-7 text-2xl'>{isLogin ? "Login" : "Sign up"}</h1>

          {
            !isLogin ?
            <>
            <input  className='w-[15vw] mb-3 rounded-full px-3 py-1 outline-none border border-black ' 
            type="text" value={name} onChange={(e)=> setName(e.target.value)} required   placeholder='Name' />

            <input className='w-[15vw] mb-3 rounded-full px-3 py-1 outline-none border border-black ' 
            type="text" value={username} onChange={(e)=> setUserName(e.target.value)} required   placeholder='Username' />
            </> 
            :  ""

          }

            <input className='w-[15vw] mb-5 rounded-full px-3 py-1 outline-none border border-black ' 
            type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required  placeholder='Email' />

            <input className='w-[15vw] mb-5 rounded-full px-3 py-1 outline-none border border-black ' 
            type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required   name="" placeholder="Password" />
            
          


            <button className='w-[15vw] text-white font-black rounded-full bg-blue-500 p-2 mb-2 '>
            
              {isLogin ? "Login" : "Create Account"}
              
              </button>

            <p className='font-light'> {!isLogin ? "Already have an account?" : "Dont have an account?"} 
            <b className='hover:cursor-pointer hover:text-red-500  font-bold' onClick={loginSignupHandler}>
              
              {!isLogin ? "Login" : "Sign up"} </b>
              
              </p>
          </form>
        
        </div>


      

    </div>
  )
}

export default Login