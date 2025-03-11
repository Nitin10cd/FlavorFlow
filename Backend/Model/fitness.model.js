import mongoose from "mongoose";

// Diet Schema
const dietSchema = new mongoose.Schema({
  dietName: { type: String, required: true, trim: true },
  dietCalorie: { type: Number, required: true },
  dietFats: { type: Number, required: true },
  dietProtein: { type: Number, required: true }, 
  dietCarbo: { type: Number, required: true },
  dietImage: { type: String, required: true, trim: true },
  ingredients: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
}, { timestamps: true }); 

const DietModel = mongoose.model("Diet", dietSchema);

// Fitness Schema
const fitnessSchema = new mongoose.Schema({
  hotelName: { type: String, required: true, trim: true },
  hotelCode: { type: String, required: true, trim: true},
  planName: { type: String, required: true, trim: true },
  planCode: { type: String, required: true, trim: true, unique: true },  
  diet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet",
      required: true
    }
  ],
  price: { type: Number, required: true, min: 0 } 
}, { timestamps: true });

const FitnessModel = mongoose.model("Fitness", fitnessSchema);

export { DietModel, FitnessModel };


// next target
// chart material : top 5 plans booked 
// top 5 less plan booked 
