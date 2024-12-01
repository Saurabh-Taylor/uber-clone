import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected" , connection.connection.host);
    } catch (error) {
        
        console.log(error);
        process.exit(1)
    }
};