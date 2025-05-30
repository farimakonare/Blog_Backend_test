import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog_db';

const startServer = async() => {

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database connected');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
                });
    } catch (error) {
        console.log('Database connection failed');
        process.exit(1);
    }
};

startServer();
