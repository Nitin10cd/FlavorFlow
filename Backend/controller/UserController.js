import userModel from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from 'validator';
import hotelModel from "../Model/Hotel.model.js";

// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token expires in 7 days
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User does not exist" });
        }

        // Compare passwords
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Generate token
        const token = createToken(user._id);
        const userRef = user._id;
        return res.status(200).json({ success: true, token, userRef});
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { username, email, password, paymentId, cartData } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            paymentId,
            cartData: cartData || {} 
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        
        return res.status(201).json({ success: true, token});
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// getting the is hotelExists or not
const checkIsHotelExists = async (req, res) => {
    try {
      const { owner } = req.body;
      console.log(owner)
      if (!owner) return res.status(400).json({ success: false, message: "Owner is required" });
  
      const existingHotel = await hotelModel.findOne({ owner });
      if (!existingHotel) return res.status(200).json({ success: false, message: "No hotel exists", exists: false });
  
      return res.status(200).json({ success: true, message: "Hotel exists", exists: true, hotelDetails: existingHotel });
    } catch (error) {
      return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
  };
  


  const getUserReference = async (req, res) => {
    try {
      const { owner } = req.body;
      if (!owner) return res.status(400).json({ success: false, message: "User reference is required" });
  
      const hotel = await hotelModel.findOne({ owner: owner });
      if (!hotel) return res.status(404).json({ success: false, message: "No hotel found, please register first" });
  
      return res.status(200).json({
        success: true,
        hotelDetails: {
          hotelId: hotel._id,
          hotelName: hotel.hotelName,
          hotelCode: hotel.hotelCode,
          isRegistered: hotel.isRegistered,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
  };
  
  const getUserInfo = async (req, res) => {
    try {
      const { userReference } = req.body;
  
      if (!userReference) {
        return res.status(400).json({ success: false, message: "User reference is required" });
      }
  
      const userData = await userModel.find({_id:userReference});
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      return res.status(200).json({ success: true, data: userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

export { loginUser, registerUser , checkIsHotelExists , getUserReference , getUserInfo };
