import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { CiHeart } from 'react-icons/ci';
import { FaRegBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast"
import axios from "axios"
import { TWEET_API_END_POINT, timeSince } from '../utils/constant.jsx';
import {useDispatch, useSelector} from "react-redux"
import {getRefresh} from "../redux/tweetSlice.jsx"





const MiddleFeed = ({tweets}) => {

  const {user} = useSelector(store => store.user)
  const {tweet} = useSelector(store => store.tweet)

  const dispatch = useDispatch()

  const likeOrDislike = async (id)=>{
    try {

      const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id} ,{
        withCredentials : true
      })

      dispatch(getRefresh())
      toast.success(res.data.message)


      
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error);  
    }
  }



  const deleteTweet = async (id)=>{
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
        withCredentials : true
      })
      dispatch(getRefresh())
      toast.success(res.data.message)
    } 
    catch (error) {
      console.log(error);  
    }
  }


  return (

    <div className='mb-4 py-2'>
        <hr />
        <div className='flex  gap-1 p-2 '>
            
        <img className='w-[3vw] rounded-[50%] object-cover object-center ' src="https://i1.sndcdn.com/artworks-g0BuiArwDWshWeY0-hkBPMA-t500x500.jpg" alt="" />
        <h1 className='font-bold'> {tweets?.userDetails[0]?.name} </h1>
        <p className='mt-1 '> <FaXTwitter color='black'/> </p>
        <p className='font-light'>@{`${tweets?.userDetails[0]?.username} . ${timeSince(tweets?.updatedAt || tweets?.createdAt)} `}</p>

        <p className='font-light'> . {``}</p>

        </div>

        <div className='ml-14 mt-[-2vw]'>

              {tweets?.description}

        </div>

        <div className='flex items-center justify-between p-5'>

          <div className='flex items-center '>

            <div className='p-1 hover:bg-green-200 rounded-full cursor-pointer'>

              <BiMessageRounded  />

            </div>
          <p className='font-light text-sm '>0</p>
          </div>

          <div className='flex items-center'>
            <div onClick={()=>likeOrDislike(tweets?._id)} className=' p-1 hover:bg-red-200 rounded-full cursor-pointer'>

            <CiHeart size="20px" />

            </div>

          <p  className='font-light text-sm'> 

            {tweets?.like.length} 

           </p>
          </div>


          <div className='flex items-center'>

            <div className='p-1 hover:bg-yellow-200 rounded-full cursor-pointer'>

            <FaRegBookmark size='15px'/>

            </div>
          <p className='font-light text-sm'>0</p>

          </div>

          {user?._id === tweets?.userId  && 
          
            <div onClick={()=>deleteTweet(tweets?._id)} className='p-1 hover:bg-red-200 rounded-full cursor-pointer'>

            <MdDelete size='18px'/>

            </div>
          }




        </div>

    </div>
  )
}

export default MiddleFeed