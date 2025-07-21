import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const authMiddleWare=async(req,res,next)=>{
    const {access_token}= req.headers
    if(!access_token)
    {
        return res.status(200).json({
            EC:-1,
            EM:"Không xác thực được người dùng"
        })
    }
    try {
        const decode_token=jwt.verify(access_token,process.env.JWT_SECRET)
        req.body.id=decode_token?.id 
        next()
    } catch (error) {
        console.log(error)
        res.status(404).json({
            EC:-1,
            EM:"Lỗi xác thực người dùng!"
        })
    }
}