import axios from 'axios'
import  { useEffect } from 'react'
import { TWEET_API_END_POINT } from '../utils/constant.jsx'
import {useDispatch, useSelector} from "react-redux"
import { getAllTweets } from '../redux/tweetSlice.jsx'


const useGetAllTweets = (id) => {

    const dispatch = useDispatch()

    const {refresh, isActive} = useSelector(store => store.tweet)

    const {user} = useSelector(store => store.user)

    

    const fetchAllTweets = async ()=>{
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,{
                withCredentials : true
            })
            console.log(res);

            dispatch(getAllTweets(res.data.tweet))

        } 
        catch (error) {
            console.log(error);
            
        }
    }

    const followingTweetsHandler = async ()=>{

        try {
            
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweet/${id}`,  {
                withCredentials : true
            })

            dispatch(getAllTweets(res.data.tweet))
    
        } 

        catch (error) {
            console.log(error);    
        }
    }

    useEffect(()=>{
        if(isActive){

            fetchAllTweets()
        }
        else{

            followingTweetsHandler()
        }
    },[refresh, isActive])




 
}

export default useGetAllTweets