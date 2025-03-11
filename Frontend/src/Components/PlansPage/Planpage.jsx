import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/Storecontext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./style.css";

const Planpage = () => {
  const { mealorUser, setmealorUser, fitnessPlanForUser, setfitnessPlanForUser, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Meals
      const mealResponse = await axios.get(`${url}/api/food/getwholePlan`);
      if (mealResponse.data?.data) {
        setmealorUser(mealResponse.data.data);
      } else {
        throw new Error("Error fetching meals");
      }

      // Fetch Fitness Plans
      const fitnessPlanResponse = await axios.get(`${url}/api/food/getAllthefitnessplan`);
      if (fitnessPlanResponse.data?.data) {
        setfitnessPlanForUser(fitnessPlanResponse.data.data);
      } else {
        throw new Error("Error fetching fitness plans");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); 

  const toastRender = () => {
    alert('Plan purchased');
  }

  return (
    <>
      <h2>Explore Meals</h2>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="dietContainer">
        {mealorUser?.length > 0 ? (
          mealorUser.map((item, index) => (
            <div key={index} className="dietContainer-box">
              <h2>Plan Name: {item.planName}</h2>
              <p>Plan Code: {item.planCode}</p>
              <p>Price: {item.price}</p>
              <NavLink className="NavLink" to="/mealDiets" state={{ plan: item }}>
                View Details
              </NavLink>
              <br />
              <br />
              <button>Purchase</button>
            </div>
          ))
        ) : (
          <p>No meals available</p>
        )}
      </div>

      <br />
      <hr />
      <br />
      <br /><br /><br />
      <h2>Explore Diets</h2>

      <div className="dietContainer">
        {fitnessPlanForUser?.length > 0 ?(
          fitnessPlanForUser.map((item, index) => (
            <div key={index} className="dietContainer-box">
              <h2>Plan Name: {item.planName}</h2>
              <p>Plan Code: {item.planCode}</p>
              <p>Price: {item.price}</p>
              <NavLink to="/dietCard" state={{ plan: item }} className="NavLink"
              onClick={() => console.log("Navigating with Plan:", item.diet)}
              >
                View Complete Plan
              </NavLink>
              <br />
              <br />
              <button onClick={toastRender}>Purchase plan</button>
            </div>
          ))
        ) : (
          <p>No fitness plans available</p>
        )}
      </div>
    </>
  );
};

export default Planpage;
