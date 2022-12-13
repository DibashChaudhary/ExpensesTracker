import { findUser } from "../models/user/UserModel.js";

export const isAuth = async (req, res, next) => {
    //if valid user then return true otherwise false
    try {
        const {authorization}=req.headers
        console.log(authorization);
        const user =authorization ? await findUser({_id:authorization}) : null;
        console.log(user)
        user?._id 
        ? next()
        :res.json({
            status:"error",
            message:"Unauthorized",
        })
        console.log("hit middleware")
    } catch (error) {
        next;
    }
}