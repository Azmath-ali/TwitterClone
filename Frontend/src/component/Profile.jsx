import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'react-hot-toast';
import {getFollowing} from "../redux/userSlice.jsx"
import {getRefresh} from "../redux/tweetSlice.jsx"


const Profile = () => {
  const {user, profile} = useSelector(store => store.user)
  const {id} = useParams()

  const dispatch = useDispatch()

  useGetProfile(id)


  const followOrUnFollow = async ()=>{

    if(user.following.includes(id)){

      // Unfollow...
      try {
  
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id},{
          withCredentials : true
        })

        dispatch(getFollowing(id))
        dispatch(getRefresh())

        toast.success(res.data.message)
        
      } 
      catch (error) {
        toast.error(error.response.data.message)

        console.log(error);  
      }
    }


    else{
      try {
  
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id},{
          withCredentials : true
        })
        dispatch(getFollowing(id))
        dispatch(getRefresh())

        toast.success(res.data.message)
        
      } 
      catch (error) {
        toast.error(error.response.data.message)

        console.log(error);  
      }
    }





  }




  return (

    <div className='w-[50%] relative'>

      <div className='flex items-center gap-4 p-4 '>

        <Link to="/"  className='cursor-pointer'  >

        <IoArrowBackOutline size="24px" />

        </Link>

        <div>
          <h1  className='font-bold'> {profile?.name} </h1>
          <p className='text-sm  font-light'>10 post</p>

        </div>
      
      </div>


      <div className='w-[100%] h-[40%] bg-black  '>
        <img className='size-full object-cover' src="https://xclcamps.com/wp-content/uploads/coding-difference-1.jpg" alt="" />
      </div>

        <div className='w-[10vw] h-[10vw] absolute top-[23vw] left-[2%] rounded-full overflow-hidden border  bg-red-200  z-20   cursor-pointer'>
          <img className='size-full object-cover' src="https://i1.sndcdn.com/artworks-g0BuiArwDWshWeY0-hkBPMA-t500x500.jpg" alt="" />

        </div>

       
        <div className='text-right mt-2'>

        {(profile?._id === user?._id) ? 
        
          <button className='hover:bg-blue-400 hover:text-white border border-black px-3 py-1 rounded-full font-black'
          >  Edit Profile
          </button>

          :

          <button onClick={followOrUnFollow} className='hover:bg-blue-400 hover:text-white border border-black px-3 py-1 rounded-full font-black'
          >  {user.following.includes(id) ? "Following" : "Follow"}
          </button>
      
        }

        </div>

      <div className='mt-3 ml-4 p-2'>
        <h1 className='font-black'> {profile?.name} </h1>
        <p className='text-sm font-light'>@{profile?.username}</p>

        <div className='mt-4'>
          <p className='text-sm font-light'>🟢 Exploring the web's endless possibilities with MERN stack 🚀 | Problem solver by day,
            coder by night 🌙 | Coffee lover ☕️ |
    
          </p>
        </div>
      </div>


    </div>
  )
}

export default Profile