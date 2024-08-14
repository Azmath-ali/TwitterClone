import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import axios from "axios"
import { TWEET_API_END_POINT } from '../utils/constant.jsx';
import toast from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import { getIsActive, getRefresh } from '../redux/tweetSlice.jsx';


const UpperFeed = () => {

    const {user} = useSelector(store => store.user)

    const {isActive} = useSelector(store => store.tweet)

    const [description, setDescription] = useState("")

    const dispatch = useDispatch()

    
    

    const submitHandler = async ()=>{
        try {

            const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description, id:user?._id},{
                withCredentials : true
            })

            dispatch(getRefresh())

            if(res.data.success){
                toast.success(res.data.message)
            }
            
        } 
        catch (error) {
            toast.error(error.response.data.message)
            console.log(error);    
        }
        setDescription("")
    }

    const forYouHandler = ()=>{
        dispatch(getIsActive(true))

    }

    const followingHandler = ()=>{
        dispatch(getIsActive(false))
    }


    


  return (
    <div className='mb-10'>
        <div className='flex items-center justify-between '>

            <h1 onClick={forYouHandler}  className={`${isActive ? " border-b-2 border-red-800" : ""} w-[50%] cursor-pointer text-center hover:bg-slate-200 p-2`}>For you</h1>

            <h1 onClick={followingHandler}
             className={`${isActive ? "" : "border-b-2 border-blue-600"} w-[50%] cursor-pointer text-center hover:bg-slate-200 p-2`}>Following</h1>
        </div>
        <hr />

        <div className=' p-2 mt-5 gap-3 '>

            <div className='flex items-center'>

            <img className='w-[3vw] rounded-[50%] object-cover object-center ' src="https://i1.sndcdn.com/artworks-g0BuiArwDWshWeY0-hkBPMA-t500x500.jpg" alt="" />
            <input className='w-[100%] outline-none text-xl p-2' type="text" placeholder='What is happening?!'
             name="" id="" value={description} onChange={(e)=> setDescription(e.target.value)}  />

            </div>

            <div className='flex justify-between p-3 '>
                <div className='flex items-center cursor-pointer  '>
                    <CiImageOn/>
                    <input type="text" className='' hidden name="" id="" />

                </div>

                <button onClick={submitHandler} className='bg-[#F91980] font-bold rounded-2xl text-white px-5 py-1'>Post</button>

            </div>
        </div>

        <hr />

    </div>
  )
}

export default UpperFeed