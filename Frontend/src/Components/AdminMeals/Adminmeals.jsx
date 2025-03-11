import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../Context/Storecontext";

const AdminMeals = () => {
  const { adminSideMeals, setadminSideMeals, hotelCode, url } = useContext(StoreContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!hotelCode) {
        console.warn("Hotel Code is missing");
        return;
      }

      try {
        const response = await axios.post(`${url}/api/food/gettingMonthlymess`, { hotelCode });
        if (response.data.success) {
          setadminSideMeals(response.data.data);
        } else {
          console.error("Error: API response unsuccessful");
        }
      } catch (err) {
        console.error("Error fetching meals:", err);
      }
    };

    fetchMeals();
  }, [hotelCode, url]); 

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide Plans" : "View Plans"}
      </button>

      {show && (
        <div className="dietsContainer">
          {adminSideMeals.map((item, index) => (
            <div key={index} className="dietContainer-box">
              <h2>Plan Name: {item.planName}</h2>
              <p>Plan Code: {item.planCode}</p>
              <NavLink to="/mealDiets" state={{ plan: item }}>
                View Complete Details
              </NavLink>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMeals;
