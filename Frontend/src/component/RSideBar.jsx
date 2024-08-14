import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';
import { Link} from 'react-router-dom';

const RSideBar = () => {

  const {user,otherUser} = useSelector(store =>store.user)

  useOtherUsers(user?._id)





  
  return (
    <div className='w-[30%] ml-4 '>

      <div  className='w-[80%] rounded-full outline-none bg-gray-200 flex items-center gap-3  px-4 py-2'>
        <IoSearchOutline width='10px'/>

        <input className='outline-none bg-transparent '
          placeholder='Search' type="text" name="" id="" />

      </div>


      <div className='w-[80%] mt-8 bg-gray-100 p-2 rounded-lg'>
        <h1 className='font-bold mb-4'>Who to Follow</h1>

        { otherUser?.map((val,index)=>
        
          <div key={index} className='flex items-center justify-between mb-5'>

            <div className='flex gap-2'>
              
              <img className='w-[3vw] rounded-[50%] object-cover object-center ' src="https://i1.sndcdn.com/artworks-g0BuiArwDWshWeY0-hkBPMA-t500x500.jpg" alt="" />
                
              <div className='flex flex-col'>
                <h1> {val?.name} </h1>
                <p className='font-light text-sm' >@{val?.username}</p>
              </div>

            </div>
          
          <Link to = {`/profile/${val?._id}`}> 
          <button className='bg-black px-4 py-0.5 rounded-2xl text-white'>Profile</button>
          </Link>

          </div>
        )}


       

      </div>
      

    </div>
  )
}

export default RSideBar