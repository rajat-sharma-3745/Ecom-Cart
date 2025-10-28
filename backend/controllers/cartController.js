import Cart from "../models/Cart.js"
import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/errorHandler.js";


export const getCart =asyncHandler(async (req,res,next) => {
    const cartItems = await Cart.find().populate();
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cartItems, total });
})
export const addToCart =asyncHandler(async (req,res,next) => {
    const {productId,qty} = req.body;

     if (!productId || !qty || Number(qty) <= 0) {
      return next(new ApiError( "Invalid product ID or quantity",400))
    }
    let cartItem = await Cart.findOne({productId});
    if(cartItem){
        cartItem.qty+=qty
    }else{

        cartItem = await Cart.create({productId,qty})
    }
    res.status(201).json({
        success:true,
        message:'Product added successfully',
        cartItem
    })
})
export const removeFromCart = asyncHandler(async (req,res,next) => {
   const {id:productId} = req.params;
   const cartItem = await Cart.findOneAndDelete({productId});
   if(!cartItem) return next(new ApiError('Product does not exist',400));
   res.status(200).json({
        success:true,
        message:'Product removed successfully'
    })
})