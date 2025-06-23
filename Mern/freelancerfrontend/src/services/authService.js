import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Backend API URL

// =======================
// 📌 For Client (loginhr.jsx, signupf.jsx)
// =======================

// ✅ Client Signup
export const signupClient = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup-client`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during signup" };
  }
};

// ✅ Client Login
export const loginClient = async (userData) => {
  try {
    if (!userData.email || !userData.password) {
      throw { message: "Email and password are required" };
    }

    const response = await axios.post(`${API_URL}/loginclient`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📦 Client Login Raw Response:", response);

    const token = response?.data?.data?.token;
    const user = response?.data?.data?.user;
    if (!token) {
      throw { message: "Failed to receive token from backend" };
    }

    return {
      token,
      role: response?.data?.data?.role,
      user,
    };
  } catch (error) {
    console.error("Login Error:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during login" };
  }
};

// =======================
// 📌 For Admin (login.jsx, signup.jsx)
// =======================

// ✅ Admin Signup
export const signupAdmin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signupAdmin`, userData);
    return response.data;
  } catch (error) {
    console.error("Admin Signup Error:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during admin signup" };
  }
};

// ✅ Admin Login
export const loginAdmin = async (userData) => {
  try {
    if (!userData.usernameOrEmail || !userData.password) {
      throw { message: "Email and password are required" };
    }

    const response = await axios.post(`${API_URL}/loginAdmin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📦 Admin Login Raw Response:", response);

    const token = response?.data?.token;
    const user = response?.data?.user;

    if (!token) {
      throw { message: "Failed to receive token from backend" };
    }

    return {
      token,
      role: user?.role,
      user,
    };
  } catch (error) {
    console.error("Admin Login Error:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during admin login" };
  }
};

// =======================
// ✅ For Other Roles (Freelancer, HR, etc.)
// =======================

export const loginOtherRole = async (userData) => {
  try {
    if (!userData.usernameOrEmail || !userData.password) {
      throw { message: "Email and password are required" };
    }

    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📦 Other Role Login Raw Response:", response);

    const token = response?.data?.token;
    const user = response?.data?.user;

    if (!token) {
      throw { message: "Failed to receive token from backend" };
    }

    return {
      token,
      role: user?.role,
      user,
    };
  } catch (error) {
    console.error("Other Role Login Error:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during login" };
  }
};

// =======================
// ✅ Job Posting (New Function)
// =======================

export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post("http://localhost:5000/api/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected the syntax
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error posting job:", error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred during job posting" };
  }
};
