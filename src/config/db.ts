//Connecting app to our mongobd using mongoose lib

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog');
        console.log("Database connected");
    } catch(error){
        console.error('database connection failed', error);
        process.exit(1);
    }
}
export default connectDB;