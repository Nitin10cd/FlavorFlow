import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/UserRoute.js';
import 'dotenv/config.js'
// app config
const app = express();
const port = 3000;

// db connection
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));  

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);

app.get('/', async (req, res) => {
    console.log("Server running on port 3000");
    res.send("Server running on port 3000");
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
