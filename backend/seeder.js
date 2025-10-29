import mongoose from "mongoose";
import dotenv from "dotenv";
import { products } from "./data/product.js";
import Product from "./models/Product.js";

dotenv.config({
    path:'./.env'
})

await mongoose.connect(process.env.MONGO_URI)

const seedData = async() =>{
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.log("Error seeding data ",error);
        process.exit(1)
    }
}
seedData();