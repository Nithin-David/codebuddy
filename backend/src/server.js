import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config"
import connectDB from './db/db.js';
import authRouter from './routers/auth.router.js';


const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})


