import { asyncHandler } from "../utils/asyncHandler.js";

export const processCheckout = asyncHandler(async(req,res) => {
   const {cartItems} = req.body;
   const total = cartItems.reduce((acc,item)=>acc+item.price*item.qty,0)
    const receipt = {
      total,
      timestamp: new Date(),
    };
    res.json(receipt);
})