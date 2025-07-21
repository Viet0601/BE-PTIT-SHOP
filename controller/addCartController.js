import { addToCartService, getAllCartService, removeToCartService } from "../service/addToCartService.js";

export const addToCartController=async(req,res)=>{
    const userId=req?.body?.id ;
    const itemId=req?.body?.itemId;
    try {
        if(userId)
        {
            if(itemId)
            {
                const response=await addToCartService({id:userId,itemId:itemId})
                res.status(200).json(response)
            }
            else 
            {
                res.status(200).json({
                EC:-1,
                EM:"Không tìm thấy món ăn này"
            }) 
            }
        }
        else 
        {
            res.status(200).json({
                EC:-1,
                EM:"Không xác thực được người dùng!"
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
export const removeToCartController=async(req,res)=>{
    const userId=req?.body?.id ;
    const itemId=req?.body?.itemId;
    try {
        if(userId)
        {
            if(itemId)
            {
                const response=await removeToCartService({id:userId,itemId:itemId})
                res.status(200).json(response)
            }
            else 
            {
                res.status(200).json({
                EC:-1,
                EM:"Không tìm thấy món ăn này"
            }) 
            }
        }
        else 
        {
            res.status(200).json({
                EC:-1,
                EM:"Không xác thực được người dùng!"
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
export const getAllCartController=async(req,res)=>{
    const userId=req?.body?.id ;
    try {
        if(userId)
        {
           const response=await getAllCartService(userId)
           res.status(200).json(response)
        }
        else 
        {
            res.status(200).json({
                EC:-1,
                EM:"Không xác thực được người dùng!"
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
