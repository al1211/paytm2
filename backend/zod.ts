import z, { lowercase, minLength } from "zod"

export const UserSchema=z.object({
    firstname:z.string(),lowercase
})