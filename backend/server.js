import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'

dotenv.config()

connectDB()
const app = express()

app.use('/api/products/', productRouter)

app.use((err, req, res, next) => {
    res.status(404)
    res.json({
        message: err.message,
        stack: process.env.NODE_env === 'production' ? null : err.stack,
    })
})
const PORT = process.env.PORT
app.listen(PORT, console.log(`${PORT}`))
