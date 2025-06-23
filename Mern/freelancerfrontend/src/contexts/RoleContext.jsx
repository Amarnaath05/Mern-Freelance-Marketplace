import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create Role Context
const RoleContext = createContext();

// 2. Provider Component
export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);

  // 3. Fetch role on initial mount if token is available
  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedRole = res.data.role;
        setRoleState(fetchedRole);
        localStorage.setItem("role", fetchedRole);

        console.log("✅ Role fetched from backend:", fetchedRole);
      } catch (err) {
        console.error("❌ Error fetching role:", err);
        localStorage.removeItem("role");
        setRoleState(null);
      }
    };

    fetchRole();
  }, []);

  // 4. Optional debug log on role change
  useEffect(() => {
    if (role) {
      console.log("🔍 RoleContext updated:", role);
    }
  }, [role]);

  // 5. Setter that also updates localStorage
  const setRole = (newRole) => {
    if (newRole) {
      localStorage.setItem("role", newRole);
    } else {
      localStorage.removeItem("role");
    }
    setRoleState(newRole);
  };

  // 6. Provide role and setter
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// 7. Custom hook to use RoleContext
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context; // returns { role, setRole }
};
