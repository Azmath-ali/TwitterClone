import express from "express"
import {Register, Login, Logout, Bookmark, getMyProfile, getOthersProfile, follow, unfollow}  from "../Controller/userController.js"
import { isAuthenticated } from "../config/Auth.js"

const userRouter = express.Router()



userRouter.post("/register", Register)
userRouter.post("/login", Login)
userRouter.get("/logout", Logout)
userRouter.put("/bookmark/:id", isAuthenticated, Bookmark)
userRouter.get("/profile/:id", isAuthenticated, getMyProfile)
userRouter.get("/other/:id", isAuthenticated, getOthersProfile)
userRouter.post("/follow/:id", isAuthenticated, follow)
userRouter.post("/unfollow/:id", isAuthenticated, unfollow)




export default userRouter

