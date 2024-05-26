import express from 'express';
import multer from 'multer';
import { Listfood, addFood, removeFoodItem } from '../controllers/foodController.js';
const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) =>
        {
            return cb(null,`${Date.now()}${file.originalname}`)
        }
})
const upload = multer({storage:storage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",Listfood)
foodRouter.post("/remove",removeFoodItem)


export default foodRouter

