import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/Home/HomePage";
import LoginPage from "../features/Auth/Login/LoginPage";
import SignUpPage from "../features/Auth/SignUp/SignUp";

import Dashboard from "../features/Dashboard/Dashboard";
import OwnersPage from "../features/Owner/OwnersPage";
import BooksPage from "../features/Book/BooksPage";
import CustomersPage from "../features/Customer/CustomersPage";
import CheckoutPage from "../features/Book/CheckoutPage";
import ProtectedRoute from "./ProtectedRoute";
import RedirectWrapper from "./RedirectWrapper";
import BookDetailsPage from "../features/Book/BookDetailsPage";
import CategoryFilteredPage from "../features/Category/CategoryFilteredPage";
import RentsPage from "../features/Rent/RentsPage";
import NotFoundPage from "./NotFoundPage";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <RedirectWrapper element={<LoginPage />} /> },
  { path: "/adminSignup", element: <SignUpPage /> },
  { path: "/ownerSignup", element: <SignUpPage /> },
  { path: "/signup", element: <SignUpPage /> },

  {
    path: "/bookRent/:id",
    element: <ProtectedRoute children={<CheckoutPage />} />,
  },
  {
    path: "/category/:id",
    element: <CategoryFilteredPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute children={<Dashboard />} />,
  },
  {
    path: "/owners",
    element: <ProtectedRoute children={<OwnersPage />} />,
  },
  {
    path: "/books",
    element: <ProtectedRoute children={<BooksPage />} />,
  },
  {
    path: "/customers",
    element: <ProtectedRoute children={<CustomersPage />} />,
  },
  {
    path: "/rents",
    element: <ProtectedRoute children={<RentsPage />} />,
  },
  {
    path: "/bookDetails/:id",
    element: <BookDetailsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
