import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users",userRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})
