import express from 'express';
const app = express();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URL 
mongoose.connect(process.env.MONGO_URL).then(()=>{ console.log('connect with db')}).catch((err)=>{console.log(err);
});


app.use(express.json())


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);




app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
    
})

app.listen(PORT, () =>console.log(`server is running ${PORT}`))