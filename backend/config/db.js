import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
        })
        console.log(conn.connection.host)
    } catch (e) {
        console.log(e.message + process.env.MONGO_URI)
        process.exit(1)
    }
}
export default connectDB
