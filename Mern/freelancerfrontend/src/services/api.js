import axios from "axios";

// Step 1: Create an Axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // The backend URL from your environment variable
});

// Step 2: Create a function to register a user
export const registerUser = async (userData) => {
  return await API.post("/auth/signup", userData);
};

// Step 3: Create a function to log in a user
export const loginUser = async (loginData) => {
  return await API.post("/auth/login", loginData);
};

// Step 4: Fetch user role from backend
export const fetchUserRole = async (token) => {
  if (!token) return null; // If no token is available, return null
  
  try {
    const res = await API.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected the syntax
      },
    });
    return res.data.role; // Return the role data from the backend
  } catch (err) {
    console.error("❌ Failed to fetch user role", err);
    return null; // Return null if there's an error fetching the role
  }
};

// ✅ Step 5: Add function to post a job
export const postJob = async (jobData, token) => {
  try {
    const res = await API.post("/api/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected the syntax
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error posting job:", err);
    throw err;
  }
};

// Step 6: Default export the API instance
export default API;
