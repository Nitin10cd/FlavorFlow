import mongoose from "mongoose";
import { DietModel, FitnessModel } from "../Model/fitness.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


if (!process.env.API_KEY) {
    throw new Error("API Key is missing from environment variables.");
}


// Fetch content from the  model
const ModelFetch = async (prompt) => {
    try {
        // error check 1
        console.log("Prompt received:", prompt);
        // check 2
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            throw new Error("Invalid or empty prompt.");
        }

        // done
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        
        console.log("Response received:", result.response.text());
        return result.response;
    } catch (error) {
        console.error("Error during content generation:", error.stack);
        throw new Error('Error generating content');
    }
};




const createDiet = async (req, res) => {
    try {
        const { dietName, dietCalorie, dietFats, dietProtein, dietCarbo, dietImage, ingredients, description } = req.body;
        
        if (!dietName || !dietCalorie || !dietFats || !dietProtein || !dietCarbo || !dietImage || !ingredients || !description) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (isNaN(dietCalorie) || isNaN(dietFats) || isNaN(dietProtein) || isNaN(dietCarbo)) {
            return res.status(400).json({ success: false, message: "Calories, fats, protein, and carbs must be numeric values." });
        }

        const prompt = `
        Given the diet details for "${dietName}":
        - Calories: ${dietCalorie}
        - Fats: ${dietFats}
        - Protein: ${dietProtein}
        - Ingredients: ${ingredients}
        - Description: ${description}
      
        Please evaluate if this diet is suitable for human health in the context of a ${dietName} meal (pre-workout or post-workout).
        
        - Return true if the diet is beneficial and supports the human body’s needs for a ${dietName} meal, ensuring proper energy and recovery. 
        - Return false if the diet is harmful or not suitable for the body, based on the nutritional needs for ${dietName} meals, or if the ingredients/amounts don't support optimal health for the specified purpose.
        
        Ensure that the ingredients: ${ingredients} and the description: ${description} align with typical health and performance requirements for a ${dietName} meal, considering energy, muscle recovery, and overall well-being.
      
        Answer in "true" or "false" only
      `;
      

        const result = await ModelFetch(prompt);
        const responseText = result.text().trim().toLowerCase();

        let boolValue = true;
        if (responseText === 'false') {
            boolValue = false;
        } else if(responseText === 'true') {
            boolValue = true;
        } else {
            return res.status(400).json({ success: false, message: "Try to give invalid prompt to model" });
     }
        

        if (!boolValue) {
            return res.status(400).json({ success: false, message: "You tried to add an insufficient meal that can harm human health." });
        }

        const newDiet = new DietModel({
            dietName,
            dietCalorie,
            dietCarbo,
            dietFats,
            dietImage,
            dietProtein,
            ingredients,
            description
        });

        await newDiet.save();
        res.status(201).json({ success: true, message: "Diet created successfully", data: newDiet });

    } catch (error) {
        console.error("Error creating diet:", error.stack);
        res.status(500).json({ success: false, message: `Error creating diet: ${error.message}` });
    }
};


const createMeal = async (req, res) => {
    try {
        const { hotelName, hotelCode, planName, planCode, diet, price } = req.body;
        console.log(req.body)
        if (!hotelName || !hotelCode || !planName || !planCode || !diet || !price) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

   
        if (!Array.isArray(diet) || diet.length < 2) {
            return res.status(400).json({ success: false, message: "Diet must contain at least two meals." });
        }

        const [preworkoutId, postworkoutId] = diet;

        const preWorkoutMeal = await DietModel.findById(preworkoutId);
        const postWorkoutMeal = await DietModel.findById(postworkoutId);

        if (!preWorkoutMeal || !postWorkoutMeal) {
            return res.status(404).json({ success: false, message: "One or both meals not found." });
        }

        const dietPlan = new FitnessModel({
            hotelName,
            hotelCode,
            planName,
            planCode,
            diet: [preworkoutId, postworkoutId],
            price,
        });

        await dietPlan.save();

        res.status(201).json({
            success: true,
            message: "Fitness plan created successfully!",
            data: dietPlan
        });

    } catch (error) {
        console.error("Error creating meal plan:", error);
        res.status(500).json({ success: false, message: `Error creating meal plan: ${error.message}` });
    }
};





const getAllPlans = async (req, res) => {
    try {
        const { hotelCode } = req.body;
        console.log("Received hotelCode:", hotelCode);

        if (!hotelCode) {
            return res.status(400).json({ success: false, message: "Error: Please provide the hotel ID" });
        }

        const plans = await FitnessModel.find({ hotelCode });

        if (!plans.length) {
            return res.status(404).json({ success: false, message: "No plans found for the given hotel ID" });
        }

        const planDetails = await Promise.all(plans.map(async (plan) => {
            const diets = await Promise.all(
                plan.diet.map(async (id) => {
                    const diet = await DietModel.findById(id);
                    return diet || null;  // Ensure null values are handled properly
                })
            );

            return {
                _id: plan._id,
                hotelCode: plan.hotelCode,
                planName: plan.planName,
                planCode: plan.planCode,
                diet: diets.filter(Boolean), 
                price: plan.price
            };
        }));

        return res.status(200).json({ success: true, plans: planDetails });
    } catch (error) {
        console.error("Error in fetching data:", error);
        return res.status(500).json({ success: false, message: "Error in fetching data", error: error.message });
    }
};

const getAllFitnessPlan = async (req,res) => {
    try {
        const allPlans = await FitnessModel.find().populate("diet");
        res.status(200).json({success: true, data: allPlans});
    } catch (error) {
        res.status(400).json({success: false, message: "failed to get the all meals error caught in catch"});
    }
}




export { createDiet, createMeal , getAllPlans,getAllFitnessPlan};
