import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})
