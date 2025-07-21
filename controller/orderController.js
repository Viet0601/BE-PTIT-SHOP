import { getAllOrderService, getListOrderService, placeOrderService, updateOrderStatusService, verifyOrderService } from "../service/orderService.js";

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
export const verifyOrderController=async(req,res)=>{
    try {
        const {success,orderId}=req?.body 
        console.log(success,orderId)
        const response=await verifyOrderService({success,orderId})
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            EC:-1, 
            EM:"Lỗi từ hệ thống!"
        })
    }
}
export const getListOrderController=async(req,res)=>{
    try {
        const userId= req?.body?.id 
        const response=await getListOrderService(userId)
        res.status(200).json(response)
    } catch (error) {
         console.log(error)
        res.status(404).json({
            EC:-1, 
            EM:"Lỗi từ hệ thống!"
        })
    }
}
export const getAllOrderController=async(req,res)=>{
    try {
        const response =await getAllOrderService();
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            EC:-1, 
            EM:"Lỗi từ hệ thống!"
        })
    }
}
export const updateOrderStatusController=async(req,res)=>{
    try {
        const data=req?.body;
        if(data?.orderId && data?.status)
        {
             const response=await updateOrderStatusService(req?.body)
        res.status(200).json(response)
        }
        else 
        {
             res.status(200).json({
                EC:-1,
                EM:"Cập nhật đơn hàng không thành công!"
             })
        }
       
    } catch (error) {
         console.log(error)
        res.status(404).json({
            EC:-1, 
            EM:"Lỗi từ hệ thống!"
        })
    }
}
