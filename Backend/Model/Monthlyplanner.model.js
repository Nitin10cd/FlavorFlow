import mongoose from "mongoose";

// mealschema
const mealSchema = new mongoose.Schema({
    mealName: {type: String, required: true, trim: true},
    mealCalorie: {type: String, required: true},
    mealFats: {type: String, required: true},
    mealProtein: {type: String, required: true},
    mealCrbo: {type: String, required: true},
    mealImage: {type: String, required: true, trim: true},
    ingredients: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true}
});

const mealModel = mongoose.model('Meal', mealSchema);

const monthlyPlan = new mongoose.Schema({
    hotelName: {type: String, required: true, trim: true},
    hotelCode: {type: String, required: true, trim: true},
    planName: {type: String, required: true, trim: true},
    planCode: {type: String, required: true, trim: true},
    meals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: true
        }
    ],
    price: {type: Number, required: true, min: 0}
},{timestamps: true});

const monthlyModel = mongoose.model('MonthlyModel', monthlyPlan);
export {mealModel,monthlyModel};
