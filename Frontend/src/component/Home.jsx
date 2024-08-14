import React, { useEffect } from 'react'
import LSideBar from "./LsideBar/LSideBar.jsx"
import RSideBar from './RSideBar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import useGetAllTweets from '../hooks/useGetAllTweets.jsx'
import { useSelector } from 'react-redux'

const Home = () => {

  const navigate = useNavigate()

  const {user} = useSelector(store => store.user)
  
  useGetAllTweets(user?._id)

  useEffect(()=>{
    
    if(!user){
      navigate("/login")
    }

  },[])



  return (
    <div className='w-[100%] flex justify-between'>
        <LSideBar/>
        <Outlet/>
        <RSideBar/>
    </div>
  )
}

export default Home