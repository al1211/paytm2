import express, { type Request, type Response } from "express"

const userRouter=express.Router();


userRouter.post("/singin",async(req:Request,res:Response)=>{
    res.send("helo")
})


export const UserRouter={userRouter}