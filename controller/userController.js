import { LoginService, RegisterUserService } from "../service/userService.js"

export const registerController=async(req,res)=>{
    const data=req.body
    
    try {
        if( !data?.name || !data?.email || !data?.password)
        {
             res.status(200).json({
                EC:-1,
                EM:"Thiếu thông tin người dùng nhé!"
            })
        }
        else 
        {
        const response=await RegisterUserService(data);
         res.status(200).json(response)
        }
        
    } catch (error) {
        console.log(error)
         res.status(404).json({
            EC:-1,
            EM:"Lỗi hệ thống!"
        })
    }
}
export const LoginController=async(req,res)=>{
    const data=req.body
    try {
        if(!data.email || !data.password)
        {
            res.status(200).json({
                EC:-1,
                EM:"Thiếu thông tin người dùng!"
            })
        }
        else 
        {
            const response=await LoginService(data);
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
         res.status(404).json({
            EC:-1,
            EM:"Lỗi hệ thống!"
        })
    }
}