import Cookies from "js-cookie";

import { Navigate, useLocation } from "react-router-dom";

// const isAuthenticated = () => {
//   return !!Cookies.get("jwt");
// };

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { pathname } = useLocation();

  const isAuth = !!localStorage.getItem("token") || !!Cookies.get("jwt");
  console.log({ isAuth });
  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace state={{ referrer: pathname }} />;
}
