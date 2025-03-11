import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    paymentId: { type: String, required: true },
    cartData: { type: Object, default: {} },
    registeredHotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    purchasedMealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "MonthlyDish" }],
    purchasedFitnessPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "FitnessModel" }]
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default userModel;


