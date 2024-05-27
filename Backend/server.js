import cors from "cors"
import 'dotenv/config'
import express from "express"
import { connectDB } from "./config/db.js"
import CardRouter from "./routes/cartRoute.js"
import foodRouter from "./routes/foodRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"
const app = express()
const port = 4000   

app.use(express.json())
app.use(cors())

//db connection
connectDB();
//api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart",CardRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=> {
    res.send("API WORKING")
})

app.listen(port,()=> {
    console.log(`Server is running on  http://localhost:${port}`)
})

// mongodb+srv://leleon1212:pvJChCVP0CbjmD5W@cluster0.vm2rq45.mongodb.net/?

// mongodb+srv://leleon1212:pvJChCVP0CbjmD5W@cluster0.vm2rq45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0