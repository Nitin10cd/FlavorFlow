import "./List.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:3000";
  const [listing, setListing] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setListing(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load food items");
    }
  };

  const removeFood = async (foodId) => {
    console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message)
    }else{
      toast.error("Error")
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list flex-col">
      <p>All Your Foods</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Dish Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {listing.length > 0 ? (
          listing.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={item.image ? `${url}/images/${item.image}` : "https://via.placeholder.com/100"}
                alt="Dish"
                onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
              />
              <p>{item.dishName}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={() => removeFood(item._id)} className="delete-btn">X</button>
            </div>
          ))
        ) : (
          <p className="cursor">No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
