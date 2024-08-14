import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({
    path : "../config/.env"
})

const dataBaseConnection =()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Connected to DataBase")).catch((err)=> console.log(err))
}


export default dataBaseConnection