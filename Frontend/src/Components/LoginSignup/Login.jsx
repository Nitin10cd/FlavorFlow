import React, { useState } from "react";
import "./Login.css"; 

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Logging In:", formData);
        alert(`User Logging In:\n${JSON.stringify(formData, null, 2)}`);
        setFormData({ email: "", password: "" });
    };

    return (
        <div className="authContainer">
            <form onSubmit={handleSubmit} className="authForm">
                <h2>Login</h2>

                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} required />

                <button className="googleBtn">Login with Google</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
