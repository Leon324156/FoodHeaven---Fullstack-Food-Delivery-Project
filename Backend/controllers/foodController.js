import fs from 'fs';
import Food from "../models/foodModel.js";
const addFood = async (req, res) => {
  let image_filenames = `${req.file.filename}`
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filenames,
    category: req.body.category,
  })
  try {
    await food.save();
    res.json({success:true,message:"Food added successfully"})
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

const Listfood= async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//remove food item
const removeFoodItem = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await Food.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food removed successfully"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}


export { Listfood, addFood, removeFoodItem };

