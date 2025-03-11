import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../Context/Storecontext';
import './Singlepage.css';

const Singlepage = () => {
  const { id } = useParams();
  const { food_list, addToCart } = useContext(StoreContext);
  const foodItem = food_list.find(item => item._id === id);

  if (!foodItem) {
    return <h2>Food item not found!</h2>;
  }

  return (
    <div className="food-details-container">
      {/* Image */}
      <img src={`http://localhost:3000/uploads/${foodItem.image}`} alt={foodItem.name} className="food-details-image" />

      {/* Details */}
      <div className="food-details-info">
        <h1>{foodItem.dishName}</h1>
        <p className="food-hotel">From: {foodItem.hotelName}</p>
        <img className='rateImage' src="/importantsvg/frontend_assets/rating_starts.png" alt="Rating Stars" />
        <p className="food-category">{foodItem.category}</p>
        <p className="food-description">{foodItem.description}</p>
        <p className="food-ingredients">Ingredients: {foodItem.ingredients}</p>
        <p className="food-price">Price: ${foodItem.price}</p>

        {/* Add to Cart */}
        <button className="add-to-cart-button" onClick={() => addToCart(foodItem._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Singlepage;
