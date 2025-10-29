import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cartController.js";

const router = Router();
// GET /api/products
router.get('/',getCart);
router.post('/',addToCart);
router.patch("/update-qty", updateCartQuantity);
router.delete('/:id',removeFromCart);



export default router