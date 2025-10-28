import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'

dotenv.config();


const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;


app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/checkout',checkoutRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to Ecom cart');
})



connectDb().then(()=>{
    app.listen(PORT,()=>console.log('Server Running on port',PORT))
})



