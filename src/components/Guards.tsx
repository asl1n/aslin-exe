import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = ({ allowedRole }: { allowedRole: string }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (userRole !== allowedRole) {
    const homeMap: Record<string, string> = {
      admin: "/",
      tutorial: "/tutorial",
      app3: "/app3",
    };
    return <Navigate to={homeMap[userRole || "admin"] || "/login"} replace />;
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
