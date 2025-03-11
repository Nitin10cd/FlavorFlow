import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('my URL')
    .then(()=>{
        console.log("Db connnected");
    })
}

