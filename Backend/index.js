import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './Routes/user.js';
import cors from 'cors';

dotenv.config(); // Load env variables first

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const PORT =2000;
const MONGOURL= "mongodb+srv://rj507943:bBk8v0AwL9AGTLx3@cluster0.bh0ibn2.mongodb.net/";


mongoose
  .connect(MONGOURL, {
    dbName: "CRUD_USER",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  
app.use('/api', userRoutes); // Use the user routes under the /api path


app.get('/', (req, res) => {
  res.send('Welcome to the CRUD User API');
  });


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
