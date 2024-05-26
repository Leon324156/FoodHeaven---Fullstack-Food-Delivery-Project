import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/CardController.js";
import authMiddleware from "../middleware/auth.js";


const CardRouter = express.Router();

CardRouter.post('/add',authMiddleware,addToCart);

CardRouter.post('/remove',authMiddleware,removeFromCart);

CardRouter.post('/get',authMiddleware,getCart);


export default CardRouter;