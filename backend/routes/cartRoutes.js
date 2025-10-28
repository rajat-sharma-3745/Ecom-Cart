import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = Router();
// GET /api/products
router.get('/',getCart);
router.post('/',addToCart);
router.delete('/:id',removeFromCart);



export default router