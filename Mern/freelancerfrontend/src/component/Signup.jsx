import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.css";
import bgImage from "../assets/sign.jpg";
import { registerUser } from "../services/api"; // apii

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    


    if (!validateEmail(email)) {
      setError("Invalid email format!");
      return;
    }

    setError(""); 
    


    try {
      const response = await registerUser({ username, email, password });

      alert(response.data.message || "Signup successful!");
      navigate("/login"); 

    } 
    catch (error)
     {
      setError(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-bg" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="signup-content">
          <div className="signup-text">
            <h1>Sign up</h1>
            <p>Start fresh. Start here. Sign up now!</p>
          </div>
          <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
              />
              <div className="signup-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="signup-btn">Sign Up</button>
              <button type="button" className="login-btn" onClick={() => navigate("/login")}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
