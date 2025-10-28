import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product",required:true },
  qty: { type: Number, default: 1 },
});

const Cart = mongoose.model('Cart',cartSchema)

export default Cart
