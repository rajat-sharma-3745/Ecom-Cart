import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
})