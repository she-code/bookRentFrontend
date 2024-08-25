import Cookies from "js-cookie";
import { navigate } from "raviger";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  // Check for authentication token in localStorage or cookies
  const isAuth = !!localStorage.getItem("token") || !!Cookies.get("jwt");

  if (isAuth) {
    return <>{children}</>;
  }

  // Redirect to login page if not authenticated
  navigate("/login", {
    replace: true,
    state: { referrer: window.location.pathname },
  });
  return null; // Render nothing while redirecting
}
