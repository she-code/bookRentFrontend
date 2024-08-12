import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface RedirectWrapperProps {
  element: React.ReactNode;
}

const RedirectWrapper: React.FC<RedirectWrapperProps> = ({ element }) => {
  const isAuthenticated =
    !!Cookies.get("jwt") || !!localStorage.getItem("token");

  // Redirect authenticated users away from the login page
  return isAuthenticated ? <Navigate to="/" replace /> : <>{element}</>;
};

export default RedirectWrapper;
