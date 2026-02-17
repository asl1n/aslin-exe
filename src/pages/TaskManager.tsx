import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TaskManager(): ReactElement {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    toast.success("Logout Successful!");
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
}
