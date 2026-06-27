import express from "express"
import cors from "cors"
import zod, { core } from "zod"
import { UserRouter } from "./routes/user.routes.ts";
import { connectDB } from "./db.ts";

const app=express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/user",UserRouter.userRouter)
app.use("/api/v1/account",UserRouter.userRouter)

app.listen(3000,()=>{
    console.log("server is listen on 300")
})