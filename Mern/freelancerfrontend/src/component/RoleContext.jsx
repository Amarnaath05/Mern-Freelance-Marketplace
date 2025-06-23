// RoleContext.js
import React, { createContext, useContext, useState } from "react";

// Create RoleContext
const RoleContext = createContext();

// Custom hook to use the RoleContext
export const useRole = () => {
  return useContext(RoleContext);
};

// Provider component to wrap your app and provide the role context
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
