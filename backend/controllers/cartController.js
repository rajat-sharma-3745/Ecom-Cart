import Cart from "../models/Cart.js"
import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/errorHandler.js";

const userId = "mockUser1";


export const getCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.find({ userId }).populate('items.productId');// items is an array of products(objects) mongoose automatically loops through and populate each product id.
    if (!cart) {
        return res.json({ items: [], total: 0 });
    }
    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    res.json({ items: cart.items, total });
})
export const addToCart = asyncHandler(async (req, res, next) => {
    const { productId, qty } = req.body;

    if (!productId || !qty || Number(qty) <= 0) {
        return next(new ApiError("Invalid product ID or quantity", 400))
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, qty }]
        })
    } else {
        //   find if the item already exist or not
        const existingItem = cart.items.find((item) => item.productId.toString() === productId)
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.items.push({ productId, qty })
        }
        await cart.save();
    }

    res.status(201).json({
        success: true,
        message: 'Product added successfully',
        cart
    })
})
export const removeFromCart = asyncHandler(async (req, res, next) => {
    const { id: productId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new ApiError('Cart not found', 400))
    } else {
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

    }
    await cart.save();
    res.status(200).json({
        success: true,
        message: 'Product removed successfully',
        items:cart.items
    })
})

export const updateCartQuantity = asyncHandler(async(req,res,next)=>{
     const {productId,qty} = req.body;
     const cart = await Cart.findOne({userId});
     if (!cart) {
        return next(new ApiError('Cart not found', 400))
    } 

    const item = cart.items.find(item=>item.productId.toString()===productId);
    if(!item) return next(new ApiError('Item not found in cart',400));

    if(qty>0){
        item.qty=qty
    }else{
        cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    }
    await cart.save();
     res.json({ message: "Cart updated", items: cart.items });

})