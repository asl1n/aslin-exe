import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = ({
  allowedRole,
}: {
  allowedRole: "admin" | "tutorial";
}) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (userRole !== allowedRole) {
    return (
      <Navigate to={userRole === "tutorial" ? "/tutorial" : "/"} replace />
    );
  }

  return <Outlet />;
};

export const GuestGuard = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (isAuthenticated) {
    return (
      <Navigate to={userRole === "tutorial" ? "/tutorial" : "/"} replace />
    );
  }
  return <Outlet />;
};
