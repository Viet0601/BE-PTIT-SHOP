
import userModel from "../model/userModel.js";

export const removeToCartService=(data)=>{
    return new Promise(async(resolve, reject) => {
    try {
        const user=await userModel.findById(data?.id)
        if(user)
        {
            const cart=  user.cartData;
            
            if(cart[data?.itemId]>0)
            { 
                cart[data?.itemId]-=1 
                await userModel.findByIdAndUpdate(data?.id,{cartData:cart})
            resolve({
                EC:0,
                EM:"Đã xóa khỏi giỏ hàng!",
                 DT:cart
            })
            }
            else 
            {
               resolve({
                EC:-1,
                EM:"Không có trong giỏ hàng!"
            })  
            }
           
            
        }
        else 
        {
            resolve({
                EC:-1 ,
                EM:"Không xác thực được người dùng!"
            })
        }
    } catch (error) {
        console.log(error)
        reject(error)
    } 
    })
   
}
export const addToCartService=(data)=>{
    return new Promise(async(resolve, reject) => {
    try {
        const user=await userModel.findById(data?.id)
        if(user)
        {
            const cart=  user.cartData;
            
            if(!cart[data?.itemId])
            {
                cart[data?.itemId]= +1 
            }
            else 
            {
                cart[data?.itemId]+=1
            }
           
            await userModel.findByIdAndUpdate(data?.id,{cartData:cart})
            resolve({
                EC:0,
                EM:"Đã thêm vào giỏ hàng!",
                DT:cart
            })
        }
        else 
        {
            resolve({
                EC:-1 ,
                EM:"Không xác thực được người dùng!"
            })
        }
    } catch (error) {
        console.log(error)
        reject(error)
    } 
    })
   
}
export const getAllCartService=(id)=>{
    return new Promise(async(resolve, reject) => {
    try {
        const user=await userModel.findById(id)
        if(user)
        {
            const cart=  user.cartData;
            resolve({
                EC:0,
                DT:cart,
                EM:"Lấy giỏ hàng thành công!"
            })
        }
        else 
        {
            resolve({
                EC:-1 ,
                EM:"Không xác thực được người dùng!"
            })
        }
    } catch (error) {
        console.log(error)
        reject(error)
    } 
    })
   
}