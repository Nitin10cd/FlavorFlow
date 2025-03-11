import { useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { StoreContext } from "../../Context/Storecontext";

const Card = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0; 
  const navigate = useNavigate(); 
  
  return (
    <div className="food-item">
      <div className="food-item-image-container">
      <img src={`http://localhost:3000/uploads/${image}`} alt={name} className="food-item-image" />

        {itemCount > 0 && <p className="item-count">{itemCount}</p>}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src="/importantsvg/frontend_assets/rating_starts.png" alt="Rating Stars" />
        </div>

        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>

        
        <div className="item-count-controls">
          <button 
            className="count-button" 
            onClick={() => removeFromCart(id)} 
            disabled={itemCount <= 0}
          >
            <FiMinus size={18} /> 
          </button>
          <span>{itemCount}</span>
          <button className="count-button" onClick={() => addToCart(id)}>
            <FiPlus size={18} /> 
          </button>
        </div>


        <button className="details-button" onClick={() => navigate(`/food/${id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default Card;
