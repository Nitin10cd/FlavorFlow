import React, { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../Context/Storecontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,subtotal , setsubtotal, total , settotal , getTotalCartAmount , url} = useContext(StoreContext);
  const deliveryFee = 2;
  const navigate = useNavigate();

  // Calculate Subtotal
  const Dummysubtotal = food_list.reduce((acc, item) => {
    return acc + item.price * (cartItems[item._id] || 0);
  }, 0);
  setsubtotal(Dummysubtotal)

  // Calculate Total (Subtotal + Delivery Fee)
  const Dummytotal = subtotal + (subtotal > 0 ? deliveryFee : 0);
  settotal(Dummytotal);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <button className="cross" onClick={() => removeFromCart(item._id)}>❌</button>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Bottom Section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${subtotal > 0 ? deliveryFee.toFixed(2) : "0.00"}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()+2}</p>
            </div>
            <button disabled={subtotal === 0} onClick={()=>navigate('/order')}>Proceed To Checkout</button>
          </div>

          {/* Promo Code Section */}
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here:</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
