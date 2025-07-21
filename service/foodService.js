import foodModel from "../model/foodModel.js"
import fs from "fs"
export const AddNewFoodService=(data)=>{
    return new Promise(async(resolve, reject) => {
        try {
        const food=new foodModel(data)
        await food.save()
        resolve({
            EC:0,
            EM:"Thêm món thành công!"
        })
        } catch (error) {
            reject(error)
        }
        
    })
}
export const getAllFoodService=()=>{
    return new Promise(async(resolve, reject) => {
        try {
            const foodList=await foodModel.find({})
            resolve({
                EC:0,
                DT:foodList,
                EM:"Lấy danh sách món ăn thành công"
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const removeFoodService=(id)=>{
    return new Promise(async(resolve, reject) => {
        try {
            const food=foodModel.findById(id);
            if(food)
            {
                fs.unlink(`uploads/${food?.image}`,()=>{})
                await foodModel.findByIdAndDelete(id)
                resolve({
                EC:0,
                EM:"Xóa món ăn thành công!"
                })
            }
            else 
            {
                 resolve({
                EC:-1,
                EM:"Món ăn không tồn tại!"
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
