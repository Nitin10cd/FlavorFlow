import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    hotelCode: { type: String, required: true },
    dishName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

//  add for charts  : count how many times this dish booked 
//  hotels top 5 best dishes : booked 
// hotels top 5 less booked dishes
// which category is booked
// monthly and weakly sales


const foodModel = mongoose.model("Food", foodSchema);
export default foodModel;
