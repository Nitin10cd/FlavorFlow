import multer from 'multer';
import express from 'express';
import fs from 'fs';
import { 
    addFood, 
    addHotel, 
    listFood,
    removeFoodItem, 
} from '../controller/foodController.js';
import { createDiet, createMeal, getAllFitnessPlan, getAllPlans} from '../controller/fitness.controller.js';
import { createMonthlyMeal, createPlan, getMonthlyMealPlan , getAllTheMonthlyPlans} from '../controller/meal.controller.js';
import { checkIsHotelExists, getUserReference } from '../controller/UserController.js';

const uploadDir = './uploads';  

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const foodRouter = express.Router();

// Routes
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/registerHotel', addHotel);
foodRouter.post('/addmeal', createDiet);
foodRouter.post('/addFitnessplan',createMeal);
foodRouter.post('/addPlan', createMonthlyMeal);
foodRouter.post('/addMonthlyPlan', createPlan);
foodRouter.post('/getFitnessmeals', getAllPlans);
foodRouter.post('/gettingMonthlymess', getMonthlyMealPlan);
foodRouter.post('/checkIsHOtelExists', checkIsHotelExists);
foodRouter.post('/getHotelInfo', getUserReference);
foodRouter.post('/remove',removeFoodItem);
foodRouter.get('/getwholePlan', getAllTheMonthlyPlans);
foodRouter.get('/getAllthefitnessplan',getAllFitnessPlan);
// foodRouter.post('/testApi', testFunction);
export default foodRouter;
