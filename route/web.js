import express from "express"
import  { addFoodController, getAllFoodController, removeFoodController } from "../controller/foodController.js"
import multer from "multer"
import { LoginController, registerController } from "../controller/userController.js"
import { authMiddleWare } from "../middleware/authMiddleWare.js"
import { addToCartController, getAllCartController, removeToCartController } from "../controller/addCartController.js"
import { placeOrderController } from "../controller/orderController.js"
const router=express.Router()
const storage= multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})
export const initWebRoute=(app)=>{
    // food 
    router.post("/add-food",upload.single("image"),addFoodController)
    router.delete("/remove-food",removeFoodController)
    router.get("/get-all-food",getAllFoodController)
    //user 
    router.post("/register",registerController)  
    router.post("/login",LoginController)  
    // cart 
    router.post('/add-to-cart',authMiddleWare,addToCartController) 
    router.post('/remove-to-cart',authMiddleWare,removeToCartController)
    router.post('/get-all-cart',authMiddleWare,getAllCartController)
    // order 
    router.post('/place-order',authMiddleWare,placeOrderController)

    
    return app.use("/api/v1",router)    
}   