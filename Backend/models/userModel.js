import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    name: {type:String,reqired:true},
    email:{type:String,reqired:true,uniqe:true},
    password:{type:String,reqired:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const User = mongoose.models.user || mongoose.model("user",Userschema);

export default User;