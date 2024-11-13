import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cors from 'cors';
import route from './route/userRoute.js';
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT=process.env.PORT||5000;

const URI=process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB")
} catch (error) {
  console.log(error);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api",route)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
