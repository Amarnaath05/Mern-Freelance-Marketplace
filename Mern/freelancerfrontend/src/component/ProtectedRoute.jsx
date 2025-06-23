// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role, setRole } = useRole(); // Get and optionally set role from context

  // On initial mount, fetch role from localStorage if not in context
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!role && storedRole) {
      setRole(storedRole);
    }
  }, [role, setRole]);

  // If the user's role is not in the allowedRoles array, redirect them to the home page
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If the role is allowed, render the children (the protected content)
  return children;
};

export default ProtectedRoute;
