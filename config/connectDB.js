import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://stung6512:06012005@cluster0.ks5ssic.mongodb.net/ptit-food').then(()=>{
        console.log("Kết nối database thành công")
    })
}