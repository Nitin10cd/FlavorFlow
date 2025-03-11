import foodModel from "../Model/foodModel.js";
import fs from 'fs';
import userModel from "../Model/UserModel.js";
import hotelModel from "../Model/Hotel.model.js";
import { FitnessModel } from "../Model/fitness.model.js";
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



// Add food items
const addFood = async (req, res) => {
  console.log("Received File:", req.file);
  console.log("Received Body:", req.body);

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const { hotelName, hotelCode, dishName, category, price, description, ingredients } = req.body;

  if (!hotelName || !hotelCode || !dishName || !category || !price || !description || !ingredients) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const prompt = `
  Given the diet details for "${dishName}":
  - Ingredients: ${ingredients}
  - Description: ${description}

  Please evaluate if this diet is suitable for human health.
  - Return true if the diet is generally beneficial and not harmful to the human body under normal consumption.
  - Return false only if the diet contains ingredients or components that are explicitly toxic, poisonous, highly acidic, or otherwise known to cause severe health risks.
  - Do not restrict common ingredients like chocolate, sugar, or cake unless they are in extremely unhealthy amounts that could pose serious health risks (e.g., excessive sugar or extreme additives).
  - Ensure that the ingredients: ${ingredients} and the description: ${description} align with standard health requirements, considering typical portions and balanced consumption.
  
  Answer in "true" or "false" only.
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

  try {
    const food = new foodModel({
      hotelName,
      hotelCode,
      dishName,
      category,
      price,
      description,
      ingredients,
      image: req.file.filename
    });

    await food.save();

    await hotelModel.findOneAndUpdate(
      { hotelCode: hotelCode },
      { $push: { dishes: food._id } }, 
      { new: true }
    );

    res.status(201).json({ success: true, message: "Dish added successfully", food });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving dish", error: err.message });
  }
};


// list food in frontend api
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        if (foods) {
            res.json({success : true, data : foods})
        } else {
            res.json({sucess: false , message : 'error in fetching data from the db'})
        }
    } catch (error) {
        console.log(error);
        res.json({success : false , message : error})
    }
}

// Remove food items
const removeFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Delete the image file if it exists
    if (food.image) {
      const imagePath = `uploads/${food.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addHotel = async (req, res) => {
  try {
    const { hotelName, hotelCode, owner } = req.body;
    
    if (!hotelName || !hotelCode || !owner) {
      return res.status(400).json({ success: false, message: "All fields are required" , fields: `hotelName: ${hotelName} hotelCode :${hotelCode} owner: ${owner}`});
    }

    // Check if the user already registered a hotel
    const existingHotel = await hotelModel.findOne({ owner });
    if (existingHotel) {
      return res.status(400).json({ success: false, message: "User already registered a hotel" });
    }

    // Ensure hotel code is unique
    const codeExists = await hotelModel.findOne({ hotelCode });
    if (codeExists) {
      return res.status(400).json({ success: false, message: "Hotel code must be unique" });
    }

    // Create new hotel
    const newHotel = new hotelModel({
      hotelName,
      hotelCode,
      owner,
      isRegistered: true,
    });

    await newHotel.save();

    return res.status(201).json({
      success: true,
      message: "Hotel successfully registered",
      hotel: newHotel,
    });

  } catch (error) {
    console.error("Error in adding hotel:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering hotel",
      error: error.message,
    });
  }
};



export {addFood,listFood,addHotel, removeFoodItem};
