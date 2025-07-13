import express from 'express';
const app = express();
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000


app.listen(PORT, () =>console.log(`server is running ${PORT}`))