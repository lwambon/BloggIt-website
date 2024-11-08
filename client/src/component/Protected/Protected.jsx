import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
