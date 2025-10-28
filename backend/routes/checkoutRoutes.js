import { Router } from "express";
import { processCheckout } from "../controllers/checkoutController.js";

const router = Router();
// GET /api/products
router.post('/',processCheckout);



export default router