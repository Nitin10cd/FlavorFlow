import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import './meals.css'
import { StoreContext } from '../../../../../Frontend/src/Context/Storecontext';

const Meals = () => {
  const url = 'http://localhost:3000';
  const { hotelName, hotelCode } = useContext(StoreContext);

  const [meals, setmeals] = useState({
    breakfast: {
      mealName: '',
      mealCalorie: 0,
      mealFats: 0,
      mealProtein: 0,
      mealCrbo: 0,
      mealImage: '',
      ingredients: '',
      description: ''
    },
    lunch: {
      mealName: '',
      mealCalorie: 0,
      mealFats: 0,
      mealProtein: 0,
      mealCrbo: 0,
      mealImage: '',
      ingredients: '',
      description: ''
    },
    dinner: {
      mealName: '',
      mealCalorie: 0,
      mealFats: 0,
      mealProtein: 0,
      mealCrbo: 0,
      mealImage: '',
      ingredients: '',
      description: ''
    }
  });

  const [plan, setplan] = useState({
    hotelName: '',
    hotelCode: '',
    planName: '',
    planCode: '',
    mealArr: [],
    price: 0
  });

  const handleInputChange = (event, type, mealType = null) => {
    const { name, value } = event.target;
    const numericFields = ["mealCalorie", "mealFats", "mealProtein", "mealCrbo", "price"];
    const formattedData = numericFields.includes(name) ? Number(value) || 0 : value;

    if (type === 'monthlyPlan') {
      setplan((prev) => ({ ...prev, [name]: formattedData }));
    } else if (mealType) {
      setmeals((prev) => ({
        ...prev,
        [mealType]: { ...prev[mealType], [name]: formattedData }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!meals.breakfast.mealName || !meals.lunch.mealName || !meals.dinner.mealName || !plan.planName) {
        toast.error("Please fill in all required fields...");
        return;
      }

      const breakfastResponse = await axios.post(`${url}/api/food/addPlan`, meals.breakfast);
      if (!breakfastResponse.data.success) throw new Error(breakfastResponse.data.message);
      toast.success("Breakfast Added successfully");
      const breakfastId = breakfastResponse.data.data._id;

      const lunchResponse = await axios.post(`${url}/api/food/addPlan`, meals.lunch);
      if (!lunchResponse.data.success) throw new Error(lunchResponse.data.message);
      toast.success("Lunch Added successfully");
      const lunchId = lunchResponse.data.data._id;

      const dinnerResponse = await axios.post(`${url}/api/food/addPlan`, meals.dinner);
      if (!dinnerResponse.data.success) throw new Error(dinnerResponse.data.message);
      toast.success("Dinner Added successfully");
      const dinnerId = dinnerResponse.data.data._id;

      const planData = { ...plan, hotelName, hotelCode, meal: [breakfastId, lunchId, dinnerId] };
      const planResponse = await axios.post(`${url}/api/food/addMonthlyPlan`, planData);
      if (!planResponse.data.success) throw new Error(planResponse.data.message);
      toast.success("Monthly plan created");

      setmeals({
        breakfast: { mealName: '', mealCalorie: 0, mealFats: 0, mealProtein: 0, mealCrbo: 0, mealImage: '', ingredients: '', description: '' },
        lunch: { mealName: '', mealCalorie: 0, mealFats: 0, mealProtein: 0, mealCrbo: 0, mealImage: '', ingredients: '', description: '' },
        dinner: { mealName: '', mealCalorie: 0, mealFats: 0, mealProtein: 0, mealCrbo: 0, mealImage: '', ingredients: '', description: '' }
      });
      setplan({ hotelName: '', hotelCode: '', planName: '', planCode: '', mealArr: [], price: 0 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in Submitting Data");
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <br /><br />
      <h3 style={{"textAlign" : "center", "color": "gray"}}>Add Monthly Plan</h3>
      <form onSubmit={handleSubmit} className='hotelForm'>
        {["planName", "planCode", "price"].map((field) => (
          <React.Fragment key={field}>
            <label>{field}</label>
            <input type={field === "price" ? "number" : "text"} name={field} value={plan[field]} onChange={(e) => handleInputChange(e, "monthlyPlan")} placeholder={`Enter ${field}`} />
          </React.Fragment>
        ))}
        {["breakfast", "lunch", "dinner"].map((mealType) => (
          <div key={mealType} className='dietsplan'>
            <h4>Enter the {mealType} Meal</h4>
            {Object.keys(meals[mealType]).map((field) => (
              <React.Fragment key={field}>
                <label>{field}</label>
                <input type="text" name={field} value={meals[mealType][field]} onChange={(e) => handleInputChange(e, "meal", mealType)} placeholder={`Enter ${field}`} />
              </React.Fragment>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Meals;
