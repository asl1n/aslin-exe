import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestGuard = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
