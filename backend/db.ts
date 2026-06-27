import dotevn from "dotenv"
dotevn.config();
import mongoose from "mongoose";


export const connectDB=async()=>{
    try{
        const url=process.env.DATABASE_URL as string;
        mongoose.connect(url)
        console.log("mongoose connect")

    }catch(err){
        console.log(err,"err")
    }
}