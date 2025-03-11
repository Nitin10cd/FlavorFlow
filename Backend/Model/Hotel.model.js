import mongoose from "mongoose";

const RegisterHotelSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelName: { type: String, required: true },
    hotelCode: { type: String, unique: true }, 
    isRegistered: { type: Boolean, default: false },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    mealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "MealPlan" }], 
    fitnessPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fitness" }], 
});

// charts : dish vs meal vs fitness plan 


const hotelModel = mongoose.model("Hotel", RegisterHotelSchema);
export default hotelModel;
