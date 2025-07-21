import { placeOrderService } from "../service/orderService.js";

export const placeOrderController=async(req,res)=>{
    const data=req?.body ;
    const userId=req?.body?.id;
    
    try {
        const response=await placeOrderService(data,userId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            EC:-1, 
            EM:"Lỗi từ hệ thống!"
        })
    }
}