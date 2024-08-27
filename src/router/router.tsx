/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AppContainer from "../components/AppContainer";
import { useRoutes } from "raviger";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";
import UploadBook from "../features/Book/UploadBook";

export default function AppRouter(props: {
  collapsed: boolean;
  toggleCollapsedCB: () => void;
}) {
  const routes = {
    "/": () => (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
    "/login": () => <LoginPage />,
    "/adminSignup": () => <SignUpPage />,
    "/ownerSignup": () => <SignUpPage />,
    "/signup": () => <SignUpPage />,
    "/bookRent/:id": ({ id }: { id: string }) => (
      <ProtectedRoute>
        <CheckoutPage id={id} />
      </ProtectedRoute>
    ),
    "/category/:id": ({ id }: { id: string }) => (
      <CategoryFilteredPage id={id} />
    ),
    "/dashboard": () => (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    "/owners": () => (
      <ProtectedRoute>
        <OwnersPage />
      </ProtectedRoute>
    ),
    "/books": () => (
      <ProtectedRoute>
        <BooksPage />
      </ProtectedRoute>
    ),
    "/customers": () => (
      <ProtectedRoute>
        <CustomersPage />
      </ProtectedRoute>
    ),
    "/uploadBook": () => (
      <ProtectedRoute>
        <UploadBook />
      </ProtectedRoute>
    ),
    "/rents": () => (
      <ProtectedRoute>
        <RentsPage />
      </ProtectedRoute>
    ),
    "/bookDetails/:id": ({ id }: { id: string }) => <BookDetailsPage id={id} />,
    "*": () => <NotFoundPage />,
  };
  const { collapsed, toggleCollapsedCB } = props;
  const routeResult = useRoutes(routes);

  return (
    <AppContainer collapsed={collapsed} toggleSidebar={toggleCollapsedCB}>
      {routeResult}
    </AppContainer>
  );
}
