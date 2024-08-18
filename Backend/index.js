import express from "express"
import dotenv from "dotenv"
import cookieParser from  "cookie-parser"
import dataBaseConnection from "./config/DB.js"
import userRouter from "./Routes/userRoute.js"
import tweetrouter from "./Routes/tweetRoute.js"
import cors from 'cors'
import path from "path"



dotenv.config({
    path : ".env"
})

dataBaseConnection()

const app = express()

const __dirname = path.resolve()


// Middleware...

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cookieParser())

const corsOption = {
    // origin : "http://localhost:5173",
    origin : process.env.URL,
    credentials : true
}

app.use(cors(corsOption))



// API...
app.use("/api/v1/user", userRouter)
app.use("/api/v1/tweet", tweetrouter)

app.use(express.static(path.join(__dirname, "/Frontend/dist")))
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"))
})





app.get("/" , (req,res)=>{
    res.send("Server started!!!")
})



app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`)
})