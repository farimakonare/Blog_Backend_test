import express from 'express';
import postRoutes from './routes/post.routes';
import authRoutes from "./routes/auth.routes";



const app = express();

app.use(express.json());

app.use('/', postRoutes); 
app.use("/auth", authRoutes);

export default app;
