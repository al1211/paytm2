import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
import express, { type NextFunction, type Request, type Response } from "express"
const jwtSeceret=process.env.JWT_SECRET || "mysecret";
export interface AuthRequest extends Request {
  userId?: any;
}

export const AuthMiddlewWare=(req:AuthRequest,res:Response,next:NextFunction)=>{
 try{
    const AuthToken= req.headers.authorization;
    if(!AuthToken || AuthToken.startsWith("Bearer ")){
       return res.status(401).json({
    success: false,
    message: "Authorization header missing",
  });
    }

    const  token=AuthToken.split(" ")[1];
    if(!token){
      return res.status(403).json({
         message:"token are not provide"
      })
    }
    const verify=jwt.verify(token,jwtSeceret);
    if(!verify){
      return res.status(401).json({
         message:"your token is invalid"
      })
    }
    req.userId=verify;
    next();

 }catch(err){
   return res.status(500).json({
    success:false,
    message:"Internal Server erro"
   })
}}