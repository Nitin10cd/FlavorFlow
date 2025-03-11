import React, { useContext, useEffect, useState } from "react";
import "./loginpopup.css";
import crossIcon from "../../../public/importantsvg/frontend_assets/cross_icon.png";
import { StoreContext } from "../../Context/Storecontext";
import axios from "axios";

const LoginPopup = ({ setislogin }) => {
    const { url,token , settoken , userReference , setUserReference} = useContext(StoreContext);
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        paymentId: "",
    });
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault(); 
        let newUrl = isRegister ? `${url}/api/user/register` : `${url}/api/user/login`;
        try {
            const response = await axios.post(newUrl, formData);
            console.log("API Response:", response.data); 

            if (response.data.success && response.data.token) {
                localStorage.setItem("token", response.data.token); 
         
                settoken(response.data.token);
                console.log("Token saved:", localStorage.getItem("token")); 
                console.log('response.data.userRef',response.data.userRef)
                setUserReference(response.data.userRef);
                console.log(userReference);
                localStorage.setItem('user', response.data.userRef);
                console.log("User reference : ", userReference)
       
                setislogin(false);
            } else {
                alert(response.data.message || "Failed to authenticate");
            }
        } catch (error) {
            console.error("Login/Register Error:", error);
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{isRegister ? "Sign Up" : "Login"}</h2>
                    <img onClick={() => setislogin(false)} src={crossIcon} alt="Close" />
                </div>
                <div className="login-popup-input">
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Your Name"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="paymentId"
                                value={formData.paymentId}
                                placeholder="Enter Payment ID"
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{isRegister ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to terms and policies</p>
                </div>
                <button className="googleBtn" type="button">Login with Google</button>
                <p>
                    {isRegister ? "Already have an account? " : "Create a new account? "}
                    <span onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login here" : "Sign up"}
                    </span>
                </p>
            </form>
        </div>
    );
}; 

export default LoginPopup;
