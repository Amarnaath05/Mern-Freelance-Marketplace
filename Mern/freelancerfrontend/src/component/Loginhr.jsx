import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginhr.css";
import backgroundImage from "../assets/hr.jpg";
import { loginClient } from "../services/authService";
import { useRole } from "../contexts/RoleContext";
import { jwtDecode } from "jwt-decode";

const Loginhr = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const userData = { email, password };

    try {
      console.clear();
      console.log("🔐 Logging in client...");

      const response = await loginClient(userData);
      console.log("🧾 Response from backend:", response);

      if (response.token) {
        const token = response.token;
        localStorage.setItem("authToken", token);

        const decoded = jwtDecode(token);
        const userRole = decoded.role?.toLowerCase();

        console.log("🎯 Role received from JWT:", userRole);

        if (userRole === "client") {
          localStorage.setItem("role", userRole);
          setRole(userRole);
          alert("✅ Client login successful!");
          navigate("/"); // Redirect to Home
        } else {
          alert("Access denied. You are not authorized as a Client.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("role");
          setRole(null);
        }
      } else {
        setError("Failed to receive token from backend");
      }
    } catch (err) {
      console.error("❌ Login error:", err);

      if (err?.response) {
        setError(err?.response?.data?.message || "An error occurred on the server");
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during login");
      }
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
              <button type="submit" className="login-btn">
                Login
              </button>
              <button
                type="button"
                className="signup-btn"
                onClick={handleSignup}
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginhr;
