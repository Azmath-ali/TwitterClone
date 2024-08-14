import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant.jsx"
import { useEffect } from "react"
import {useDispatch} from "react-redux"
import {getMyProfile} from "../redux/userSlice.jsx"

const useGetProfile =  (id)=>{

    const dispatch = useDispatch()

    const fetchMyProfile = async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                withCredentials : true
            })
            dispatch(getMyProfile(res.data.user))
        } 
        catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        fetchMyProfile()
    },[id])




    

}

export default useGetProfile