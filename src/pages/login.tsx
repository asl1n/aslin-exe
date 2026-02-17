import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "aslin" && password === "aslin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/", { replace: true });
    } else {
      toast.error("Access Denied", {
        description: "Invalid credentials for aslin",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">AccSwift Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
