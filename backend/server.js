import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from './routes/productRoutes.js'

dotenv.config();

connectDB();
const app = express();

app.use('/api/products/',productRouter)
const PORT = process.env.PORT;
app.listen(PORT, console.log(`${PORT}`));
