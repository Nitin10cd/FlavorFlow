import { useContext , useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/Storecontext";
import axios from "axios";

const Planpurchase = () => {
  const location = useLocation();
  const planDetails = location.state?.plan;
  const {userReference,url , setUserReference} = useContext(StoreContext);
  const [paymentId, setPaymentId] = useState("");
  
  const fetchUserData = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUserReference(storedUser);
    try {
      const response = await axios.post(`${url}/api/user/userDetails`, {
        userReference: userReference,
      });
  
      console.log(response.data);
      setPaymentId(response.data.data.paymentId);
      
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, [url]);
  
  const handlePaymentClick = () => {
    alert('Payment Successul')
  }

  return (
    <div className="purchase-div">
      <h2>Plan Name : {planDetails?.planName}</h2>
      <p>Plan Code: {planDetails?.planCode}</p>
      <p>Price: {planDetails?.price}</p>
      <p>PaymentId: {paymentId}</p>
      <button onClick={handlePaymentClick}>Pay</button>
    </div>
  )
}

export default Planpurchase