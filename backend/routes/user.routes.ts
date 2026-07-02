import express, { type Request, type Response } from "express"
import bcrypt from "bcrypt"
import { Changepassword, UserSchema } from "../zod";
import { User } from "../model/user.model";
import jwt from "jsonwebtoken"
import dotevn from "dotenv"
import { AuthMiddlewWare, type AuthRequest } from "../middlewares/authMiddleware";
dotevn.config();


const userRouter=express.Router();

const jwtSeceret=process.env.JWT_SECRET || "KDJFSDKJFDKJL";

userRouter.post("/signup",async(req:Request,res:Response)=>{
    try{
        const result=UserSchema.safeParse(req.body)
        
        if(!result.success ){
            return res.status(403).json({
                success:true,
                message:"plaes validate the input",
                error:result.error
            })
        }
      const data=result.data;
     
      const existingUser=await User.findOne({userName:data.userName});
      if(existingUser){
          return res.status(401).json({
              message:false,
              mesage:"User already exists"
              
            })
        };
        let hashPassword=await bcrypt.hash(result.data.password,10);
        
        const userCreate=await User.create({...data,password:hashPassword});
        const token=jwt.sign({
            userId:userCreate._id
        },jwtSeceret );
        return res.status(201).json({
            success:false,
            message:"User succesfull creaed",
            token:token,
        })

    }catch(err){
        console.log("error",err);
        res.status(500).json({message:"Internal Server Error"})
    }
})

userRouter.put("/change-password",AuthMiddlewWare, async(req:AuthRequest,res:Response)=>{
  try{
    const userId=req.userId;
    const result =Changepassword.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            succes:false,
            message:"Please enter all things"
        })
    }
   
        const {firstname,lastName,password}=result.data;
    const hashPassword=await bcrypt.hash(password,10);
    
    const updateUser=await User.updateOne({_id:userId},{firstName:firstname,lastName,password:hashPassword});
    if(updateUser.matchedCount===0){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:"updated succesfully"
    })

  }catch(err){
    console.log("err",err);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
  }
})

userRouter.get("/bulk",async(req:Request,res:Response)=>{
    try{
        const query=req.query.filter || "";
      const users = await User.find({
  $or: [
    {
      firstName: {
        $regex: query,
        
      },
    },
    {
      lastName: {
        $regex: query,
        
      },
    },
  ],
});

        return res.status(200).json({
            success:true,
            user:users.map(user=>({
                userName:user.userName,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
              }))
        })

    }catch(err){
        console.log("err",err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

export const UserRouter={userRouter}