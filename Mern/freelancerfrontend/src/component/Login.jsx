import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginhr.css";
import backgroundImage from "../assets/hr.jpg";
import { loginClient } from "../services/authService";
import { useRole } from "../contexts/RoleContext";

const Loginhr = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const userData = { usernameOrEmail: email, password };

    try {
      const response = await loginClient(userData);
      alert("Login successful!");

      const role = response?.role;
      const user = response?.user;

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      setRole(role);

      if (role?.toLowerCase() === "client") {
        navigate("/post-job");
      } else {
        setError("Access denied. You are not authorized as a Client.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setRole(null);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid credentials!");
    }
  };

  const handleSignup = () => {
    navigate("/signupf");
  };

  return (
    <div className="login-container">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="login-content">
          <div className="login-text">
            <h1>Welcome back</h1>
            <p>Login to get access to your dashboard</p>
          </div>

          <div className="login-form">
            <h2>Client Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="login-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="login-btn">Login</button>
              <button type="button" className="signup-btn" onClick={handleSignup}>Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginhr;
