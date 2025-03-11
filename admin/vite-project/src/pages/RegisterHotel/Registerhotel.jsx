import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../../../../Frontend/src/Context/Storecontext";
import axios from "axios";
import "./Registerhotel.css";

const RegisterHotel = () => {
  const { userReference, hotelName , hotelCode , sethotelName , sethotelCode} = useContext(StoreContext);
  const [formLocker, setFormLocker] = useState(false);
  const [hotelForm, setHotelForm] = useState({
    hotelName: "",
    hotelCode: "",
    owner: userReference || "",
  });

  console.log(userReference)
  const url = "http://localhost:3000";

  
  const validateHotel = async () => {
    console.log("User Reference:", userReference);
    if (!userReference) {
      console.error("User reference is missing");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/food/checkIsHotelExists`, { owner: userReference });
      if (response.data.exists) {
        setFormLocker(true);
        console.log("User has already registered a hotel.");

        const hotelData = await axios.post(`${url}/api/food/getHotelInfo`, { owner: userReference });
        setHotelForm({
          hotelName: hotelData.data.hotelDetails.hotelName || "",
          hotelCode: hotelData.data.hotelDetails.hotelCode || "",
          owner: userReference,
        });

        sethotelName(hotelForm.hotelName);
        sethotelCode(hotelForm.hotelCode);

        
        console.log(`hotelName: ${hotelName} || hotelCode: ${hotelCode}`);
      }
    } catch (error) {
      console.error("Error validating hotel:", error);
    }
  };

  useEffect(() => {
    validateHotel();
  }, [userReference]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formLocker) {
      alert("You have already registered a hotel.");
      return;
    }

    if (!hotelForm.hotelName || !hotelForm.hotelCode || !hotelForm.owner) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/food/registerHotel`, hotelForm);
      alert(response.data.message);
      validateHotel();
    } catch (error) {
      console.error("Error registering hotel:", error);
    }
  };

  return (
    <> <br /><br /><br/>
    <div className="register-hotel-container">
      <button className="verify-button" onClick={validateHotel}>Verify</button>
      {formLocker ? (
        <div className="hotel-details">
          <h2>Your Registered Hotel</h2>
          <p><strong>Hotel Name:</strong> {hotelForm.hotelName}</p>
          <p><strong>Hotel Code:</strong> {hotelForm.hotelCode}</p>
        </div>
      ) : (
        <div className="hotel-form-container">
          <h2>Register Hotel</h2>
          <form className="hotel-form" onSubmit={handleSubmit}>
            <label>Hotel Name:</label>
            <input
              type="text"
              value={hotelForm.hotelName}
              onChange={(e) => setHotelForm({ ...hotelForm, hotelName: e.target.value })}
              required
            />

            <label>Hotel Code:</label>
            <input
              type="text"
              value={hotelForm.hotelCode}
              onChange={(e) => setHotelForm({ ...hotelForm, hotelCode: e.target.value })}
              required
            />

            <button className="submit-button" type="submit">Register Hotel</button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default RegisterHotel;