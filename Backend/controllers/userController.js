import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
import User from "../models/userModel.js";
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const userex = await User.findOne({email})
    if (!userex)
        {
      return res.status(400).json({success:false, msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userex.password);
    if (!isMatch)
        {
            return res.status(400).json({success:false, msg: "Incorrect password" });
        }
    const token = createToken(userex._id);
    res.json({success:true, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, msg: "Server error" });
    
  }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,)
}

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({success:false, msg: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({success:false, msg: "Invalid email" });
    }

    if (password.length<8)
        {
            return res.status(400).json({success:false, msg: "Please enter a strong password" });
        }
    
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
        name : name,
        email : email,
        password :  hashedPassword
    })
    const user = await newuser.save();
    const token = createToken(user._id);
    res.status(201).json({success:true,token });

  } catch (error) {
   console.log(error);
   res.json({success:false,message:"Error"})
  }
};

export { loginUser, registerUser };

