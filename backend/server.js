import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
const PORT = process.env.PORT || 3000;
const app = express()

dotenv.config()
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})