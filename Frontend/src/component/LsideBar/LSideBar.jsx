import React from 'react'
import "./LSideBar.css"
import { FaXTwitter } from "react-icons/fa6"
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { USER_API_END_POINT } from '../../utils/constant';
import {toast} from "react-hot-toast"
import {getMyProfile, getOtherUser, getUser} from "../../redux/userSlice.jsx"

const LSideBar = () => {

  const  {user} = useSelector(store=>store.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async ()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{
        withCredentials : true
      })
      dispatch(getUser(null))
      dispatch(getOtherUser(null))
      dispatch(getMyProfile(null))
      navigate("/login")

      toast.success(res.data.message)
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error);  
    }
  }


  return (
    <div className=' left-container w-[25%] flex flex-col items-center p-2 border-r-[#FBFCFC]'>
        <FaXTwitter className='text-3xl mr-32 mb-7' />

        <div className='flex flex-col gap-7 mb-7' >

          <Link to="/" className='left  flex items-center gap-4 cursor-pointer '>
          <MdHomeFilled className="text-2xl "  />
          <h1 className='text-lg font-bold'>Home</h1>
          </Link>

          <div className='left flex items-center gap-4'>
          <IoSearch className="text-2xl"/>
          <h1 className='text-lg font-bold'>Explore</h1>
          </div>

          <div className='left flex items-center gap-4'>
          <IoNotificationsOutline className="text-2xl"/>
          <h1 className='text-lg font-bold'>Notifications</h1>
          </div>


          <div className='left flex items-center gap-4'>
          <IoBookmarkSharp className="text-2xl"/>
          <h1 className='text-lg font-bold'>Bookmarks</h1>
          </div>

          <Link to={`/profile/${user?._id}`} className='left flex items-center gap-4 mb-2'>
          <IoPerson className="text-2xl"/>
          <h1 className='text-lg font-bold'>Profile</h1>
          </Link>

          <div className='left flex items-center gap-4'>
          <IoLogOutOutline className="text-2xl" />
          <h1 onClick={logoutHandler} className='text-lg font-bold'>Logout</h1>
          </div>

        </div> 

          <Link className='w-[15vw] font-bold bg-[#F91980] hover:bg-pink-600 text-center p-3 rounded-3xl text-white cursor-pointer'>
            Post
          </Link>
    </div>
  )
}

export default LSideBar