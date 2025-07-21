import foodModel from "../model/foodModel.js"
import { AddNewFoodService, getAllFoodService, removeFoodService } from "../service/foodService.js"

export const addFoodController=async(req,res)=>{
    const data=req.body
    const fileImage=`${req?.file?.filename}`
    const food= {
        name:req?.body?.name ,
        description:req?.body?.description,
        price:req?.body?.price,
        category:req?.body?.category,
        image:fileImage
    }
    try {
        const response=await AddNewFoodService(food)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
       res.status(404).json({
            EC:-1,
            EM:"Lỗi hệ thống!"
        }) 
    }
}
export const removeFoodController=async(req,res)=>{
    try {
        
        const id= req?.query?.id ;
        if(id)
        {
            const response = await removeFoodService(id);
            res.status(200).json(response)
        }
        else 
        {
            res.status(404).json({
                EC:-1,
                EM:"Thiếu id món ăn!"
            })
        }
        
    } catch (error) {
        console.log(error)
       res.status(404).json({
            EC:-1,
            EM:"Lỗi hệ thống!"
        })
    }
}
export const getAllFoodController=async(req,res)=>{
    try {
        const response= await getAllFoodService();
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
       res.status(404).json({
            EC:-1,
            EM:"Lỗi hệ thống!"
        })
    }
}

