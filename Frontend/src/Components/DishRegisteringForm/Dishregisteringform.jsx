import './Dishregisteringform.css';
import { useState } from 'react';

const Dishregisteringform = () => {
  const initialState = {
    hotelName: '',
    dishName: '',
    hotelCode: '',
    category: '',
    price: '',
    description: '',
    ingredients: '',
  };

  const [dishDetails, setDishDetails] = useState(initialState);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDishDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dish Registered:", dishDetails);
    alert(`Dish Registered:\n${JSON.stringify(dishDetails, null, 2)}`);
    setDishDetails(initialState); 
  };

  return (
    <div className="dishFormDiv">
      <form onSubmit={handleSubmit} className="dishFormData">
        <h2>Add Your Dish</h2>

        <div className="dishDivs">
          <div className="inputGroup">
            <label>Hotel Name</label>
            <input type="text" name="hotelName" value={dishDetails.hotelName} onChange={handleInputChange} placeholder="Enter the Hotel Name" required />
          </div>

          <div className="inputGroup">
            <label>Dish Name</label>
            <input type="text" name="dishName" value={dishDetails.dishName} onChange={handleInputChange} placeholder="Enter the Dish Name" required />
          </div>
        </div>

        <div className="dishDivs">
          <div className="inputGroup">
            <label>Hotel Code</label>
            <input type="text" name="hotelCode" value={dishDetails.hotelCode} onChange={handleInputChange} placeholder="Enter the Hotel Code" required />
          </div>

          <div className="inputGroup">
            <label>Category</label>
            <input type="text" name="category" value={dishDetails.category} onChange={handleInputChange} placeholder="Enter the Category" required />
          </div>
        </div>

        <div className="dishDivs">
          <div className="inputGroup">
            <label>Description</label>
            <textarea name="description" value={dishDetails.description} onChange={handleInputChange} placeholder="Enter the Dish Description"></textarea>
          </div>

          <div className="inputGroup">
            <label>Ingredients</label>
            <textarea name="ingredients" value={dishDetails.ingredients} onChange={handleInputChange} placeholder="Enter the Ingredients"></textarea>
          </div>
        </div>

        <div className="dishDivs">
          <div className="inputGroup">
            <label>Price</label>
            <input type="number" name="price" value={dishDetails.price} onChange={handleInputChange} placeholder="Enter the Price" required />
          </div>
        </div>

        <button type="submit">Register Dish</button>
      </form>
    </div>
  );
};

export default Dishregisteringform;
