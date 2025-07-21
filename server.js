import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/connectDB.js"
import bodyParser from "body-parser"
import { initWebRoute } from "./route/web.js"
dotenv.config()
// app config
const app=express()
const port=process.env.PORT || 8081

// middlewrae
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',  // cho phép từ Vite frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // các method được phép
    credentials: true  // nếu bạn dùng cookie hoặc auth headers
}));
app.use(bodyParser.json({limit: "50mb"})); 
app.use(bodyParser.urlencoded({extended:true, limit: "50mb"}));
connectDB()
initWebRoute(app);  
app.use("/images/",express.static("uploads"))
app.listen(port,()=>{
    console.log("API đang chạy trên cổng: ",port)   
})