import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext({
    food_list: [],
    cartItems: {},
    username: "",
    email: "",
    userReference: "",
    setUserReference: "",
    isLoggedin: false,
    addToCart: () => { },
    removeFromCart: () => { },
    getTotalCartAmount: () => 0,
    url: "",
    token: "",
    hotelName: "",
    sethotelName: "",
    hotelCode: "",
    sethotelCode: "",
    total: 0,
    subtotal: 0,
    settotal: 0,
    setsubtotal: 0,
    monthlyMeals: [],
    setmonthlyMeals: [],
    fitnessPlans: [],
    setfitnessPlans: [],
    adminSideFitnessPlan: [],
    setadminSideFitnessPlan: [],
    adminSideMeals: [],
    setadminSideMeals: [],
    mealorUser: [],
    setmealorUser:[],
    fitnessPlanForUser:[],
    setfitnessPlanForUser:[],
    settoken: () => { },
    emptyCart: () => { }
});

const StoreContextProvider = ({ children }) => {
    const url = "http://localhost:3000";

    // State Management
    const [cartItems, setCartItems] = useState({});
    const [token, settoken] = useState(localStorage.getItem("token") || "");
    const [food_list, setfood_list] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [userReference, setUserReference] = useState('');
    const [formLocker, setFormLocker] = useState(false);

    // cart amount
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0)

    // globally store the hotelName and hotelCode
    const [hotelName, sethotelName] = useState('');
    const [hotelCode, sethotelCode] = useState('');

    // details for the hotel plans and meals and dishes provides
    const [monthlyDiets, setmonthlyDiets] = useState({});
    const [fitnessDiets, setfitnessDiets] = useState({});
    const [dishesPlans, setdishesPlans] = useState({});

    // state for all the meals and fitness plans of the user 
    const [monthlyMeals, setmonthlyMeals] = useState([]);
    const [fitnessPlans, setfitnessPlans] = useState([]);

    // for admin side view of meals and fitness plans
    const [adminSideMeals, setadminSideMeals] = useState([]);
    const [adminSideFitnessPlan, setadminSideFitnessPlan] = useState([]);

    // meals and plan data for the user 
    const [mealorUser, setmealorUser] = useState([]);
    const [fitnessPlanForUser, setfitnessPlanForUser] = useState([])




    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUserReference(storedUser);
    }, []);


    // Fetch Food List from API
    const getFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log("Food List API Response:", response.data);

            if (response.data.success && Array.isArray(response.data.data)) {
                setfood_list(response.data.data);
            } else {
                console.error("Unexpected API Response Format");
                setfood_list([]); // Prevent errors
            }
        } catch (error) {
            console.error("API Error:", error);
            setfood_list([]); // Fallback to an empty array
        }
        console.log(food_list)
    };


    useEffect(() => {
        getFoodList();
    }, []);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage when updated
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Get Total Cart Amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
        }, 0);
    };

    // Add to Cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    // Remove from Cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId] || prev[itemId] <= 1) {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            }
            return { ...prev, [itemId]: prev[itemId] - 1 };
        });
    };

    // empty cart after the order checkout
    const emptyCart = () => {
        setCartItems({});
    }

    const contextValue = {
        food_list,
        cartItems,
        username,
        email,
        isLoggedin,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        userReference,
        setUserReference,
        settoken,
        hotelCode,
        sethotelCode,
        hotelName,
        sethotelName,
        settotal,
        setsubtotal,
        total,
        subtotal,
        emptyCart,
        monthlyMeals,
        setmonthlyMeals,
        fitnessPlans,
        setfitnessPlans,
        adminSideFitnessPlan,
        setadminSideFitnessPlan,
        adminSideMeals,
        setadminSideMeals,
        mealorUser,
        setmealorUser,
        fitnessPlanForUser,
        setfitnessPlanForUser
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
