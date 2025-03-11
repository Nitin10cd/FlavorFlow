import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../Context/Storecontext";

const Adminfitness = () => {
  const { adminSideFitnessPlan, setadminSideFitnessPlan, hotelCode, url } = useContext(StoreContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchFitnessPlans = async () => {
      if (!hotelCode) {
        console.warn("Hotel Code is missing");
        return;
      }

      try {
        const response = await axios.post(`${url}/api/food/getFitnessmeals`, { hotelCode });
        if (response.data.success) {
          setadminSideFitnessPlan(response.data.plans);
        } else {
          console.error("Error: API response unsuccessful");
        }
      } catch (err) {
        console.error("Error fetching fitness plans:", err);
      }
    };

    fetchFitnessPlans();
  }, [hotelCode, url]); 

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide Plans" : "View Plans"}
      </button>

      {show && (
        <div className="dietsContainer">
          {adminSideFitnessPlan.map((item, index) => (
            <div key={index} className="dietContainer-box">
              <h2>Plan Name: {item.planName}</h2>
              <p>Plan Code: {item.planCode}</p>
              <NavLink to="/dietCard" state={{ plan: item }}>
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

export default Adminfitness;
