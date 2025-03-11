import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import './Fitness.css'
import { StoreContext } from "../../../../../Frontend/src/Context/Storecontext";

const Fitness = () => {
  const {hotelName, hotelCode} = useContext(StoreContext);
  const url = "http://localhost:3000";

  const [addMeal, setAddMeal] = useState({
    pre: {
      dietName: "",
      dietCalorie: 0,
      dietFats: 0,
      dietProtein: 0,
      dietCarbo: 0,
      dietImage: "",
      ingredients: "",
      description: "",
    },
    post: {
      dietName: "",
      dietCalorie: 0,
      dietFats: 0,
      dietProtein: 0,
      dietCarbo: 0,
      dietImage: "",
      ingredients: "",
      description: "",
    },
  });

  const [addFitnessplan, setAddFitnessplan] = useState({
    hotelName: hotelName,
    hotelCode: hotelCode,
    planName: "",
    planCode: "",
    diet: [],
    price: 0,
  });

  const handleInputChange = (event, type, mealType = null) => {
    const { name, value } = event.target;
    const formattedValue = ["dietCalorie", "dietFats", "dietProtein", "dietCarbo", "price"].includes(name)
      ? Number(value) || 0
      : value;

    if (type === "fitness") {
      setAddFitnessplan((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (mealType) {
      setAddMeal((prev) => ({
        ...prev,
        [mealType]: { ...prev[mealType], [name]: formattedValue },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Data...", addMeal, addFitnessplan);
  
      if (!addMeal.pre.dietName || !addMeal.post.dietName || !addFitnessplan.planName) {
        toast.error("Please fill in all required fields.");
        return;
      }
  
      const preResponse = await axios.post(`${url}/api/food/addmeal`, addMeal.pre);
      if (!preResponse.data.success) throw new Error(preResponse.data.message);
      toast.success("Pre-workout meal added successfully!");
      const preworkoutId = preResponse.data.data._id;
  
      const postResponse = await axios.post(`${url}/api/food/addmeal`, addMeal.post);
      if (!postResponse.data.success) throw new Error(postResponse.data.message);
      toast.success("Post-workout meal added successfully!");
      const postworkoutId = postResponse.data.data._id;
  
      const fitnessPlanData = { ...addFitnessplan, diet: [preworkoutId, postworkoutId] };
      console.log("Final Fitness Plan Data Before Sending:", fitnessPlanData);
  
      const fitnessResponse = await axios.post(`${url}/api/food/addFitnessplan`, fitnessPlanData);
      if (!fitnessResponse.data.success) throw new Error(fitnessResponse.data.message);
      toast.success("Fitness plan added successfully!");
  
      setAddMeal({
        pre: { dietName: "", dietCalorie: 0, dietFats: 0, dietProtein: 0, dietCarbo: 0, dietImage: "", ingredients: "", description: "" },
        post: { dietName: "", dietCalorie: 0, dietFats: 0, dietProtein: 0, dietCarbo: 0, dietImage: "", ingredients: "", description: "" },
      });
      setAddFitnessplan({ hotelName: "", hotelCode: "", planName: "", planCode: "", diet: [], price: 0 });
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in submitting data");
      console.error("Error:", error);
    }
  };

  return (
    <div className="fitness-container">
      <h3 className="title">Add Your Fitness Plan</h3>
      <form onSubmit={handleSubmit} className="form-container">
        
        {["hotelName", "hotelCode", "planName", "planCode", "price"].map((field) => (
          <div key={field} className="input-group">
            <label className="input-label">{field}</label>
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={addFitnessplan[field]}
              onChange={(e) => handleInputChange(e, "fitness")}
              placeholder={`Enter ${field}`}
              className="input-field"
            />
          </div>
        ))}


        <h4 className="sub-title">Enter the Preworkout Meal</h4>
        {Object.keys(addMeal.pre).map((field) => (
          <div key={field} className="input-group">
            <label className="input-label">{field}</label>
            <input
              type="text"
              name={field}
              value={addMeal.pre[field]}
              onChange={(e) => handleInputChange(e, "meal", "pre")}
              placeholder={`Enter ${field}`}
              className="input-field"
            />
          </div>
        ))}


        <h4 className="sub-title">Enter the Postworkout Meal</h4>
        {Object.keys(addMeal.post).map((field) => (
          <div key={field} className="input-group">
            <label className="input-label">{field}</label>
            <input
              type="text"
              name={field}
              value={addMeal.post[field]}
              onChange={(e) => handleInputChange(e, "meal", "post")}
              placeholder={`Enter ${field}`}
              className="input-field"
            />
          </div>
        ))}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Fitness;
