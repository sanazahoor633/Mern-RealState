import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URL 
mongoose.connect(process.env.MONGO_URL).then(()=>{ console.log('connect with db')}).catch((err)=>{console.log(err);
});

app.listen(PORT, () =>console.log(`server is running ${PORT}`))