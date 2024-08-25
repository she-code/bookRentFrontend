import React, { useEffect } from "react";
import { navigate } from "raviger";
import Cookies from "js-cookie";

interface RedirectWrapperProps {
  element: React.ReactNode;
}

const RedirectWrapper: React.FC<RedirectWrapperProps> = ({ element }) => {
  const isAuthenticated =
    !!Cookies.get("jwt") || !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate("/login", {
        replace: true,
        state: { referrer: window.location.pathname },
      });
    }
  }, [isAuthenticated]);

  // Redirect authenticated users away from the login page
  return isAuthenticated ? <>{element}</> : null;
};

export default RedirectWrapper;
