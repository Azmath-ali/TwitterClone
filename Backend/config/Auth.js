import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config({
    path:"../config/.env"
})


export const isAuthenticated = async (req, res, next)=>{

    try {
        const {token} = req.cookies
        
        if(!token){
            return res.json({
                message : "User is not Authenticated",
                success : false
            })
        }
        const decode =  jwt.verify(token, process.env.TOKEN_SECRET)
        
        req.user = decode.userid
        next()
        
    } 
    catch (error) {
        console.log(error)
    }

}