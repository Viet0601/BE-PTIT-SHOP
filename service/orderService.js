import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET);
export const placeOrderService=(data,userId)=>{
    return new Promise(async(resolve, reject) => {
        const {items,amount,address}=data
        try {
            const newOrder= new orderModel({
                userId,items,amount,address
            })
            await newOrder.save()
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            const line_items=items.map((item)=>({
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price
                },
                quantity:item.quantity
            }))
            line_items.push({
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:"Phí vận chuyển"
                    },
                    unit_amount:25000
                },
                quantity:1
            })
            const session= await stripe.checkout.sessions.create({
                line_items:line_items,
                mode:"payment",
                success_url:`${process.env.FONTEND_URL}verify=true&orderId=${newOrder._id}`,
                cancel_url:`${process.env.FONTEND_URL}verify=false&orderId=${newOrder._id}`
            })
            resolve({
                EC:0,
                DT:session.url,
                EM:"Thanh toán thành công"
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
