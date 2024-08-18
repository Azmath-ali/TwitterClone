import jwt from "jsonwebtoken"
import User from "../Model/userSchema.js"
import bcrypt from "bcrypt"

export const Register = async (req, res)=>{

    
    try {
        const {username, name, password, email} = req.body

        if(!username || !name || !email || !password){
            return res.json({
                message : "All fields are required",
                success : false
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.json({
                message : "User already exist",
                success : false
            })
        }

        const hashPassword = await bcrypt.hash(password, 15)


        await User.create({
            name, 
            username,
            email,
            password : hashPassword
        })

        return res.json({
            message : ` ${name} Account created successfully`,
            success : true
        })
         
    } 
    catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res)=>{
    try {
        
        const {email, password} = req.body
        
        if(!email || !password){
            return res.json({
                message : "All fields are required",
                success : false,
            })
        }
        
        let user = await User.findOne({email})
        
        if(!user){
            return res.json({
                message : "User doesnot exist",
                success : false
            })
        }
        
        let isMatch = await bcrypt.compare(password , user.password)
        
        if(!isMatch){
            return res.json({
                message : "Invalid Credentials",
                success : false
            })
        }

        let tokenData = {
            userId : user._id
        }
        
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn : '1d'})

        return res.cookie("token", token, {expiresIn : "1d", httpOnly : true}).json({
            message : `Welcome back ${user.name}`,
            user,
            success : true
        })
        
    
    } 
    catch (error) {
        console.log(error)        
    }
        
}


export const Logout =  (req,res)=>{
    return res.cookie("token", "", {expiresIn : new Date(Date.now())}).json({
        message :  "Logout successfully",
        success : true
    })
}
    
export const Bookmark = async (req,res)=>{

    try {
        const userLoggedIn = req.body.id
        const tweerId = req.params.id
        
        const user = await User.findById(userLoggedIn)
        
        if(user.bookmarks.includes(tweerId)){
            // Remove Bookmark...
            await User.findByIdAndUpdate(userLoggedIn, {$pull: {bookmarks : tweerId}})
            
            return res.json({
                message : "Removed from Bookmark"
            })
        }
        
        else{
            // Save to Bookmark...
            
            await User.findByIdAndUpdate(userLoggedIn, {$push : {bookmarks : tweerId}})
            
            return res.json({
                message : "Saved to Bookmark"
            })
        }
    } 
    catch (error) {
        console.log(error);    
    }
}


export const getMyProfile = async (req,res)=>{

   try {
    const {id} = req.params
    const user = await User.findById(id).select("-password")

    return res.json({
        user
    })
   } 
   catch (error) {
    console.log(error); 
   }

}

export const getOthersProfile = async (req,res)=>{
    try {
        const {id} = req.params
        const otherUser = await User.find({_id : {$ne : id}}).select('-password')
        if(!otherUser){
            return res.json({
                message : "Currently do not have any users."
            })
        }
        return res.json({
            otherUser
        })
    } 
    catch (error) {
        console.log(error);    
    }
}


export const follow = async (req,res)=>{
    try {
        const loggedInUserId = req.body.id
        const othersId = req.params.id

        const loggedInUser = await User.findById(loggedInUserId) //For eg : This is azmath
        const others = await User.findById(othersId) // this is ertugrul

        if(!others.followers.includes(loggedInUserId)){
            await others.updateOne({$push : {followers : loggedInUserId}})
            await loggedInUser.updateOne({$push : {following : othersId} })
        }
        else{
            return res.json({
                message : `User already follow you ${others.name}`
            })
        }

        return res.json({
            message : `${loggedInUser.name} just follow you ${others.name}`,
            success : true
        })
        

    } 
    catch (error) {
        console.log(error);    
    }
}


export const unfollow = async (req,res)=>{
    try {
        const  loggedInUserId = req.body.id
        const othersId = req.params.id
        
        const loggedInUser = await User.findById(loggedInUserId)
        const others = await User.findById(othersId)



        if(loggedInUser.following.includes(othersId)){
            await others.updateOne({$pull : {followers : loggedInUserId }})
            await loggedInUser.updateOne({$pull : {following : othersId}})
        }
        else{
            return res.json({
                message : "User has not followed yet"
            })
        }

        return res.json({
            message : `${loggedInUser.name} unfollow to ${others.name}`,
            success : true
        })
        
        
    } 
    catch (error) {
        console.log(error);    
    }

}