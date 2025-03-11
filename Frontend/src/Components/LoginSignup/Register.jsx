import React, { useState } from "react";
import "./Login.css"; // Import CSS file
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        paymentId: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Registered:", formData);
        alert(`User Registered:\n${JSON.stringify(formData, null, 2)}`);
        setFormData({
            username: "",
            email: "",
            password: "",
            paymentId: "",
        });
    };

    return (
        <div className="authContainer">
            <form onSubmit={handleSubmit} className="authForm">
                <h2>Register</h2>

                <label>Username</label>
                <input type="text" name="username" value={formData.username} placeholder="Enter username" onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} required />

                <label>Payment ID</label>
                <input type="text" name="paymentId" value={formData.paymentId} placeholder="Enter Payment ID" onChange={handleChange} required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
