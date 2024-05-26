import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://leleon1212:pvJChCVP0CbjmD5W@cluster0.vm2rq45.mongodb.net/FoodHeaven').then(()=> console.log("DB connected"))
    console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
console.log('JWT Secret Key:', process.env.JWT_SECRET);
}
