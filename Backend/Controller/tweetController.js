
import Tweet from "../Model/tweetSchema.js"
import User from "../Model/userSchema.js"



export const createTweet = async (req, res)=>{

    try {
        
        const {description, id} = req.body
        
        if(!description || !id){
            return res.json({
                message : "Fields are required",
                success : false
            })
        }

        const user = await User.findById(id).select("-password")
        
        await Tweet.create({
            description,
            userId : id,
            userDetails : user
        })
        
        return res.json({
            message : "Tweet created successfully",
            success : true
        })

    } 
    catch (error) {
        console.log(error)
    }


}


export const deleteTweet = async (req, res)=>{

    try {
        const {id} = req.params
        await Tweet.findByIdAndDelete(id)
        return res.json({
            message : "Tweet deleted successfully.",
            success : true
        })
    } 
    catch (error) {
        console.log(error);    
    }

}


export const likeOrDislike = async (req, res)=>{

    const userLoggedIn = req.body.id
    const tweetId = req.params.id
    
    const tweet = await Tweet.findById(tweetId)

    if(tweet.like.includes(userLoggedIn)){
        // Dislike...
        await Tweet.findByIdAndUpdate(tweetId, {$pull : {like : userLoggedIn }})

        return res.json({
            message : "User disliked your tweet"
        })
    }

    else{
        await Tweet.findByIdAndUpdate(tweetId, {$push : {like: userLoggedIn}})

        return res.json({
            message : "User liked your tweet"
        })
    }

}



export const getAllTweets = async (req,res)=>{
    // LoggedIn user  + following user

    try {
        const {id} = req.params
        const loggedInUser = await User.findById(id)
        const loggedInUserTweets = await Tweet.find({userId : id})
        const followingUserTweet = await Promise.all(loggedInUser.following.map((val)=>{

            return Tweet.find({ userId: val })
        }))
        return res.json({
            tweet : loggedInUserTweets.concat(...followingUserTweet)
        })
    } 


    catch (error) {
        console.log(error);    
    }
  
}



export const followingTweet = async (req,res)=>{
    try {
        const {id} = req.params
        const loggedInUser = await User.findById(id)
        const followingUserTweet = await Promise.all(loggedInUser.following.map((val)=>{
            return Tweet.find({userId : val})
        }))

        return res.json({
            tweet : [].concat(...followingUserTweet)
        })
    }
     catch (error) {
        console.log(error);    
    }
}