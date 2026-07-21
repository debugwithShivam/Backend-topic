import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose'

console.log("Database Connected", process.env.MONGODB);

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/email');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB