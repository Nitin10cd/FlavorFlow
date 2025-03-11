import { mealModel, monthlyModel } from "../Model/Monthlyplanner.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// model details
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// verify .env data (exists or not)
if (!process.env.API_KEY) {
    throw new Error("API Key is missing from environment variables.");
}

// Fetch content from the  model
const ModelFetch = async (prompt) => {
    try {
        // Log the prompt to ensure it's correctly passed
        console.log("Prompt received:", prompt);
        
        // Check if prompt is empty or invalid
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            throw new Error("Invalid or empty prompt.");
        }

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        
        console.log("Response received:", result.response.text());
        return result.response;
    } catch (error) {
        console.error("Error during content generation:", error.stack);
        throw new Error('Error generating content');
    }
};




const createMonthlyMeal = async (req, res) => {
    try {
        const { mealName, mealCalorie, mealFats, mealProtein, mealCrbo, mealImage, ingredients, description } = req.body;

        if (!mealName || !mealCalorie || !mealCrbo || !mealFats || !mealProtein || !ingredients || !description || !mealImage) {
            return res.status(400).json({ success: false, message: "All details are required" });
        }

        // testing / verifying the data from AI
        const prompt = `
        Given the diet details for "${mealName}"
        - Calories: ${mealCalorie}
        - Fats: ${mealFats}
        - Protein: ${mealProtein}
        - Ingredients: ${ingredients}
        - Description: ${description}
      
        Please evaluate if this diet is suitable for human health as a ${mealName} meal (breakfast, lunch, or dinner).
        
        - Return true if the diet is beneficial and not harmful to the human body when consumed as a ${mealName} meal, providing balanced nutrition for the specified meal type.
        - Return false if the diet is harmful or not suitable for the human body, considering the necessary nutritional needs for a ${mealName} meal.
        
        Ensure that the ingredients: ${ingredients} and the description: ${description} align with typical health requirements for a ${mealName} meal, considering energy levels, muscle maintenance, and overall well-being.
      
        Answer in "true" or "false" only
      `;
      

    const result = await ModelFetch(prompt);
    console.log("Result after data fetched:", result.text());
    const resultText = result.text().trim().toLowerCase();
    console.log("Normalized response text:", resultText);
  
    let boolValue = true;
    if (resultText === 'false') {
      boolValue = false;
    } else if (resultText === 'true') {
      boolValue = true;
    } else {
      return res.status(400).json({ success: false, message: " Try to give invalid prompt to model " });
    }
  
    if (!boolValue) {
      return res.status(400).json({ success: false, message: "You tried to add an insufficient meal that can harm human health." });
    }

        const newMeal = new mealModel({ mealName, mealCalorie, mealCrbo, mealFats, mealImage, mealProtein, ingredients, description });
        await newMeal.save();

        res.status(201).json({ success: true, message: "New meal is created", data: newMeal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Meal creation failed", error: error.message });
    }
};

const createPlan = async (req, res) => {
    try {
        const { hotelName, hotelCode, planName, planCode, meal, price } = req.body;

        if (!hotelName || !hotelCode || !planName || !planCode || !meal || !price) {
            return res.status(400).json({ success: false, message: "All details are required" });
        }

        if (!Array.isArray(meal) || meal.length < 3) {
            return res.status(400).json({ success: false, message: "Plan must contain at least three meals." });
        }

        const meals = await mealModel.find({ _id: { $in: meal } });

        if (meals.length < 3) {
            return res.status(404).json({ success: false, message: "Some meals were not found" });
        }

        const mealPlan = new monthlyModel({ hotelName, hotelCode, planName, planCode, meals: meal, price });
        await mealPlan.save();

        res.status(201).json({ success: true, message: "Meal plan is created", data: mealPlan });
    } catch (error) {
        res.status(500).json({ success: false, message: "Meal plan creation failed", error: error.message });
    }
};

async function arrangeMeals(data, mealIds, index) {
    try {
        const mealsDetailsArray = await mealModel.find({ _id: { $in: mealIds } });
        data[index].meals = mealsDetailsArray;
    } catch (error) {
        console.error("Error in arranging meals:", error);
    }
}

const getMonthlyMealPlan = async (req, res) => {
    try {
        const { hotelCode } = req.body;

        if (!hotelCode) {
            return res.status(400).json({ success: false, message: "Error: Please provide the hotel ID" });
        }

        const plans = await monthlyModel.find({ hotelCode }).populate("meals");

        if (!plans.length) {
            return res.status(404).json({ success: false, message: "No meal plans found for the given hotel ID" });
        }

        res.status(200).json({ success: true, data: plans }); // Changed "plans" to "data"
    } catch (error) {
        console.error("Error in fetching meal plans:", error);
        return res.status(500).json({ success: false, message: "Error in fetching data", error: error.message });
    }
};

const getAllTheMonthlyPlans = async (req, res) => {
    try {
        const allPlans = await monthlyModel.find().populate("meals");
        res.status(200).json({ success: true, data: allPlans });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve meal plans", error: err.message });
    }
};

export { createMonthlyMeal, createPlan, getMonthlyMealPlan, getAllTheMonthlyPlans };
