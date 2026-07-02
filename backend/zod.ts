import z, { lowercase, minLength } from "zod"

export const UserSchema=z.object({
    firstname:z.string(),
    lastName:z.string(),
    password:z.string().min(6),
    userName:z.string()
});
export const Changepassword=z.object({
    firstname:z.string(),
    lastName:z.string(),
    password:z.string().min(6),
  
})