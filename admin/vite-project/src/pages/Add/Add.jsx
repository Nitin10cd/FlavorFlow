import { useState, useEffect } from "react";
import "./Add.css";
import upload from "../../assets/admin_assets/upload_area.png";
import { useContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { StoreContext } from "../../../../../Frontend/src/Context/Storecontext";
const DishForm = () => {
  const { hotelName, hotelCode } = useContext(StoreContext);
  const initialState = {
    hotelName: hotelName,
    dishName:'',
    hotelCode:  hotelCode,
    category: "",
    price: "",
    description: "",
    ingredients: "",
    image: null,
  };
  const url = "http://localhost:3000";
  const [dishDetails, setDishDetails] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDishDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDishDetails((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };


  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("hotelName", dishDetails.hotelName);
    formData.append("dishName", dishDetails.dishName);
    formData.append("hotelCode", dishDetails.hotelCode);
    formData.append("category", dishDetails.category);
    formData.append("price", dishDetails.price);
    formData.append("description", dishDetails.description);
    formData.append("ingredients", dishDetails.ingredients);
    // if image is availlable 
    if (dishDetails.image) {
        formData.append("image", dishDetails.image);
    };

    // api posting
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
        setDishDetails(initialState);
        setImagePreview(false);
        toast.success(response.data.message);
    }else{
      console.log("error in the post request");
      toast.error(response.data.message);
    }
};

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <h2>Register Your Dish</h2>


        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imagePreview ? imagePreview: upload} alt="Upload Preview" />
          </label>
          <input type="file" id="image" hidden onChange={handleFileChange} />
        </div>


        <div className="dishDivs">
          <div className="inputGroup">
            <label>Hotel Name</label>
            <input type="text" name="hotelName" value={dishDetails.hotelName} onChange={handleInputChange} placeholder="Enter Hotel Name" required />
          </div>

          <div className="inputGroup">
            <label>Dish Name</label>
            <input type="text" name="dishName" value={dishDetails.dishName} onChange={handleInputChange} placeholder="Enter Dish Name" required />
          </div>
        </div>

        <div className="dishDivs">
          <div className="inputGroup">
            <label>Hotel Code</label>
            <input type="text" name="hotelCode" value={dishDetails.hotelCode} onChange={handleInputChange} placeholder="Enter Hotel Code" required />
          </div>

          <div className="inputGroup">
            <label>Category</label>
            <select name="category" value={dishDetails.category} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
        </div>


        <div className="dishDivs">
          <div className="inputGroup">
            <label>Description</label>
            <textarea name="description" value={dishDetails.description} onChange={handleInputChange} placeholder="Enter Dish Description"></textarea>
          </div>

          <div className="inputGroup">
            <label>Ingredients</label>
            <textarea name="ingredients" value={dishDetails.ingredients} onChange={handleInputChange} placeholder="Enter Ingredients"></textarea>
          </div>
        </div>


        <div className="dishDivs">
          <div className="inputGroup">
            <label>Price ($)</label>
            <input type="number" name="price" value={dishDetails.price} onChange={handleInputChange} placeholder="Enter Price" required />
          </div>
        </div>

        <button type="submit">Register Dish</button>
      </form>
    </div>
  );
};

export default DishForm;
