import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/constant.jsx';
import { useDispatch } from 'react-redux';
import { getOtherUser } from '../redux/userSlice.jsx';
import axios from 'axios';

const useOtherUsers = (id) => {

    const dispatch = useDispatch()


    const fetchOtherUsers = async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/other/${id}`,{
                withCredentials : true
            })
            console.log(res);

            dispatch(getOtherUser(res.data.otherUser))

        }
         catch (error) {
            console.log(error);    
        }
    }


    useEffect(()=>{
        fetchOtherUsers()
    },[])





  return (
    <div>useOtherUsers</div>
  )
}

export default useOtherUsers