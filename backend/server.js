import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRouter.js'

dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.use('/api/products/', productRouter)
app.use('/api/users/', userRouter)

app.use((err, req, res, next) => {
    res.status(404)
    res.json({
        message: err.message,
        stack: process.env.NODE_env === 'production' ? null : err.stack,
    })
})
const PORT = process.env.PORT
app.listen(PORT, console.log(`${PORT}`))
