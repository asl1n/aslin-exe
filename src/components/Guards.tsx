import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = ({ allowedRole }: { allowedRole: string }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const appView = localStorage.getItem("appView");

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (appView !== allowedRole) {
    const homeMap: Record<string, string> = {
      admin: "/",
      tutorial: "/tutorial",
      task: "/task",
    };
    return <Navigate to={homeMap[appView || "admin"] || "/login"} replace />;
  }

  return <Outlet />;
};

export const GuestGuard = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const appView = localStorage.getItem("appView");

  if (isAuthenticated) {
    return <Navigate to={appView === "tutorial" ? "/tutorial" : "/"} replace />;
  }
  return <Outlet />;
};
