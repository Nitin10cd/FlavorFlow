import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './placeorder.css';
import { StoreContext } from '../../Context/Storecontext';

const Placeorder = () => {
  const { getTotalCartAmount, subtotal, deliveryFee = 5  , emptyCart} = useContext(StoreContext);
  const navigate = useNavigate();

  // Ensure subtotal is always a valid number
  const totalAmount = subtotal > 0 ? (getTotalCartAmount() ?? 0) + deliveryFee : 0;

  const handleCheckout = () => {
    emptyCart();
    navigate('/order')
  }

  return (
    <form className="place-order" onSubmit={(e) => e.preventDefault()}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" required />
          <input type="text" placeholder="Country" required />
        </div>
        <input type="tel" placeholder="Phone No" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${(subtotal ?? 0).toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${subtotal > 0 ? (deliveryFee ?? 0).toFixed(2) : "0.00"}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <button 
              disabled={subtotal === 0} 
              // onClick={() =>}
                onClick={handleCheckout}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
