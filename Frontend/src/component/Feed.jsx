import React from 'react'
import UpperFeed from './UpperFeed'
import MiddleFeed from './MiddleFeed'
import { useSelector } from 'react-redux'


const Feed = () => {

  const {tweet} = useSelector(store => store.tweet)



  return (

    <div className='w-[45%]   border border-r-[#EFF3F4]'>

      <UpperFeed/>

      {tweet?.map((val, index)=> <MiddleFeed key={index} tweets={val} />)}

      
      


    </div>

  )
}

export default Feed